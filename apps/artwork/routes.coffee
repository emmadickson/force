Q = require 'bluebird-q'
request = require 'superagent'
Backbone = require 'backbone'
Artwork = require '../../models/artwork'
{ stringifyJSONForWeb } = require '../../components/util/json'
{ client } = require '../../lib/cache'
{ FUSION_URL, ARTWORK_2_USER_IDS } = require '../../config'

appToDisplay = (req) ->
  if req.path.match(/artwork_1/)?
    'artwork_1'
  else if req.user?.id in ARTWORK_2_USER_IDS.split ','
    'artwork_2'
  else
    'default'

@index = (req, res, next) ->
  app = appToDisplay req

  return next() if app is 'artwork_2'

  artwork = new Artwork id: req.params.id
  artwork
    .fetch cache: not FUSION_URL?
    .then ->
      if app is 'default'
        # Remove the current artwork tab from the path to more easily test against artwork.href()
        artworkPath = res.locals.sd.CURRENT_PATH
        artworkPath = artworkPath.replace("/#{req.params.tab}", '') if req.params?.tab
        return res.redirect artwork.href() if artworkPath isnt artwork.href()

      res.locals.sd.ARTWORK = artwork.toJSON()

      Q.all artwork.related().artists.invoke('fetch', cache: true)

    .then ->
      # Set the primary artist as one of the fully fetched artists
      if artwork.related().artists.length
        artist = artwork.related().artist
        fetchedArtist = artwork.related().artists.get artist.id
        artist.set fetchedArtist.attributes if fetchedArtist?

      res.render 'index',
        artwork: artwork
        artist: artwork.related().artist
        artists: artwork.related().artists
        tab: req.params.tab
        auctionId: req.query?.auction_id
        jsonLD: stringifyJSONForWeb(artwork.toJSONLD())
        # HACK: Hide auction results for ADAA
        inADAA: req.query.fair_id is 'adaa-the-art-show-2015'

    .catch next

@save = (req, res) ->
  return res.redirect "/artwork/#{req.params.id}" unless req.user
  req.user.initializeDefaultArtworkCollection()
  req.user.defaultArtworkCollection().saveArtwork req.params.id,
    data: { access_token: req.user.get('accessToken') }
    error: res.backboneError
    success: ->
      res.redirect "/artwork/#{req.params.id}"

@download = (req, res, next) ->
  artwork = new Artwork id: req.params.id
  artwork.fetch cache: true, success: ->
    if artwork.isDownloadable(req.user)
      imageRequest = request.get(artwork.downloadableUrl req.user)
      imageRequest.set('X-ACCESS-TOKEN': req.user.get('accessToken')) if req.user
      req.pipe(imageRequest).pipe res
    else
      res.status 403
      next new Error 'Not authorized to download this image'

Q = require 'bluebird-q'
_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
FeaturedLink = require '../models/featured_link.coffee'
OrderedSet = require '../models/ordered_set.coffee'

class OrderedSets extends Backbone.Collection
  url: "#{sd.API_URL}/api/v1/sets"

  model: OrderedSet

  initialize: (models, { @meta }) -> #

  fetch: (options = {}) ->
    _.defaults options, data: @meta.attributes
    Backbone.Collection::fetch.call this, options

  # This could simply be replaced with:
  # new OrderedSets(owner_type: 'your_owner_type', owner_id: 'your_owner_id', sort: 'key')
  fetchItemsByOwner: (ownerType, ownerId, options = {}) ->
    options = _.defaults options,
      cache: true
      data: display_on_desktop: true

    dfd = Q.defer()

    cache = options.cache
    cacheTime = options.cacheTime

    @fetch
      url: "#{sd.API_URL}/api/v1/sets?owner_type=#{ownerType}&owner_id=#{ownerId}&sort=key"
      cache: cache
      cacheTime: cacheTime
      data: options.data
      error: dfd.resolve
      success: =>
        @fetchSets(cache: cache, cacheTime: cacheTime).then dfd.resolve

    dfd.promise

  fetchSets: (options = {}) ->
    dfd = Q.defer()
    Promise.allSettled(@map (model) ->
      model.fetchItems options.cache, options.cacheTime
    ).then dfd.resolve
    dfd.promise

  fetchAll: (options = {}) ->
    dfd = Q.defer()
    @fetch(options).then =>
      @fetchSets(options).then =>
        @trigger 'sync:complete'
        dfd.resolve arguments...
    dfd.promise

class OrderedSetMeta extends Backbone.Model
  defaults: public: true

module.exports = class _OrderedSets
  constructor: (options) ->
    return new OrderedSets(null, meta: new OrderedSetMeta(options))

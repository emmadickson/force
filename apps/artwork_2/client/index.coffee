exec = (fn) ->
  try
    fn()
  catch err
    console.error err

module.exports.init = ->
  exec require '../components/banner/index.coffee'
  exec require '../components/images/index.coffee'
  exec require '../components/metadata/index.coffee'
  exec require '../components/inquiry/index.coffee'
  exec require '../components/tabs/index.coffee'
  exec require '../components/artists/index.coffee'

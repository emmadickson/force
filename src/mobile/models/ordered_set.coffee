_ = require 'underscore'
Backbone = require 'backbone'
Items = require '../collections/items.coffee'

module.exports = class OrderedSet extends Backbone.Model

  fetchItems: (cache = false) ->
    new Promise((resolve) ->
      items = new Items null, id: @id, item_type: @get('item_type')
      @set items: items
      Promise.allSettled(items.fetch(cache: cache).then ->
        items.map (item) ->
          if _.isFunction(item.fetchItems) then item.fetchItems(cache) else item
      ).then resolve
    )

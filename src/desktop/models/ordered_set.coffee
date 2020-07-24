_ = require 'underscore'
Backbone = require 'backbone'
Items = require '../collections/items.coffee'
LayoutSyle = require './mixins/layout_style.coffee'

module.exports = class OrderedSet extends Backbone.Model
  _.extend @prototype, LayoutSyle

  fetchItems: (cache = false, cacheTime) ->
    new Promise((resolve) ->

      items = new Items null, id: @id, item_type: @get('item_type')
      @set items: items
      Promise.allSettled(items.fetch(cache: cache, cacheTime: cacheTime).then ->
        items.map (item) ->
          if _.isFunction(item.fetchItems) then item.fetchItems(cache, cacheTime) else item
      ).finally resolve
    )

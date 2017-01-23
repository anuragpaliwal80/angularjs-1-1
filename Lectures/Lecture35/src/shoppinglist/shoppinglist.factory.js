(function(){
  'use strict';

  angular.module('ShoppingList')
  .factory('ShoppingListFactory',ShoppingListFactory);

  function ShoppingListFactory(){
    var factory = function(maxItems){
      return new ShoppingListService(maxItems);
    };
    return factory;
  };

  // If not specfied maxItems assumed as unlimited
  function ShoppingListService(maxItems){
    var service = this;
    var items = [];
    service.addItem = function(itemName,itemQuantity){
      if((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)){
        var item = {
          name: itemName,
          quantity: itemQuantity
        };
        items.push(item);
      }
      else {
        throw new Error("Max items (" + maxItems + ") reached.");
      }
    };
    service.removeItem = function(itemIndex){
      items.splice(itemIndex,1);
    };
    service.getItems = function () {
        return items;
    };
  };
  
})();

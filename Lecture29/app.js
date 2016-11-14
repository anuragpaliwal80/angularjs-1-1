(function(){
  'use strict';

  angular.module('ShoppingListDirectiveApp',[])
  .controller('ShoppingListController', ShoppingListController)
  // .controller('ShoppingListDirectiveController',ShoppingListDirectiveController)
  .factory('ShoppingListFactory',ShoppingListFactory)
  .directive('shoppingList',ShoppingListDirective);

  function ShoppingListDirective(){
    var ddo = {
      templateUrl: 'shoppingList.html',
      scope: {
        items: "<", // One way binding
        title: '@'
      },
      //controller: 'ShoppingListDirectiveController as list',
      controller: ShoppingListDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };
    return ddo;
  };

  function ShoppingListDirectiveController(){
    var list = this;
    list.cookiesInList = function(){
      for (var i = 0; i < list.items.length; i++){
        var name = list.items[i].name;
        if (name.toLowerCase().indexOf("cookie") !== -1){
          return true;
        }
      }
      return false;
    };
  };

  ShoppingListController.$inject = ['ShoppingListFactory'];
  function ShoppingListController(ShoppingListFactory){
    var list = this;

    // Use factory to create new shopping list service
    var shoppingList = ShoppingListFactory();

    list.items = shoppingList.getItems();
    var orgTitle = "Shopping List # 1";
    list.title = orgTitle + " (" + list.items.length + " items )";

    list.itemName = "";
    list.itemQuantity = "";

    list.addItem = function(){
      shoppingList.addItem(list.itemName,list.itemQuantity);
      list.title = orgTitle + " (" + list.items.length + " items )";
    };
    list.removeItem = function(itemIndex){
      shoppingList.removeItem(itemIndex);
      list.title = orgTitle + " (" + list.items.length + " items )";
    };
  };

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

function ShoppingListFactory(){
  var factory = function(maxItems){
    return new ShoppingListService(maxItems);
  };
  return factory;
};

})();

(function(){
  'use strict';

  angular.module('ShoppingListDirectiveApp',[])
  .controller('ShoppingListController1', ShoppingListController1)
  .controller('ShoppingListController2', ShoppingListController2)
  .factory('ShoppingListFactory',ShoppingListFactory)
  .directive('shoppingList',ShoppingList);

  function ShoppingList(){
    var ddo = {
      restrict: "E", // "AE" is default, A is attribute and E is for element
      templateUrl: 'shoppingList.html',
      scope: {
        list: "=myList",
        title: '@title'
      }
    };
    return ddo;
  };

  ShoppingListController1.$inject = ['ShoppingListFactory'];
  function ShoppingListController1(ShoppingListFactory){
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

  ShoppingListController2.$inject = ['ShoppingListFactory'];
  function ShoppingListController2(ShoppingListFactory){
    var list = this;

    // Use factory to create new shopping list service
    var shoppingList = ShoppingListFactory(3);

    list.items = shoppingList.getItems();
    var orgTitle = "Shopping List # 2 (Limited to 3 items)";
    list.title = orgTitle + " (" + list.items.length + " items )";

    list.itemName = "";
    list.itemQuantity = "";

    list.addItem = function(){
      try{
        shoppingList.addItem(list.itemName,list.itemQuantity);
        list.title = orgTitle + " (" + list.items.length + " items )";
      }catch(error){
        list.errorMessage = error.message;
      }
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

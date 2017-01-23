(function(){
  'use strict';

  angular.module('ShoppingList')
  .controller('ShoppingListController', ShoppingListController);


  ShoppingListController.$inject = ['ShoppingListFactory'];
  function ShoppingListController(ShoppingListFactory){
    var list = this;

    // Use factory to create new shopping list service
    var shoppingList = ShoppingListFactory();

    list.items = shoppingList.getItems();
    var orgTitle = "Shopping List # 1";
    list.title = orgTitle + " (" + list.items.length + " items )";

    list.warning = "CCOKIES DEDECTED !!!";

    list.itemName = "";
    list.itemQuantity = "";

    list.addItem = function(){
      shoppingList.addItem(list.itemName,list.itemQuantity);
      list.title = orgTitle + " (" + list.items.length + " items )";
    };
    list.removeItem = function(itemIndex){
      console.log("this is: ", list);
      // console.log("itemIndex is:", itemIndex.$index);
      list.lastRemoved = "Last item removed was: " + list.items[itemIndex.$index].name;
      shoppingList.removeItem(itemIndex);
      list.title = orgTitle + " (" + list.items.length + " items )";
    };
  };

})();

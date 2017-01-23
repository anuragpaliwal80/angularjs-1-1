(function(){
  'use strict';

  angular.module('ShoppingListComponentApp',[])
  .controller('ShoppingListController', ShoppingListController)
  .factory('ShoppingListFactory',ShoppingListFactory)
  .component('shoppingList',{
    templateUrl: 'shoppingList.html',
    controller: ShoppingListComponentController,
    bindings: {
      items: "<", // One way binding
      title: '@title', // DOM attribute value binding
      onRemove: '&' // Reference binding
    }
  });

  function ShoppingListDirectiveLink (scope, element, atts, controller){
    console.log("Link scope is: ",scope);
    console.log("controller instance is: ",controller);
    console.log("element is: ",element);

    scope.$watch('list.cookiesInList()',function(newValue,oldValue){
      console.log("oldValue: ",oldValue);
      console.log("newValue: ",newValue);
      if(newValue === true){
        displayCookieWarning();
      }else{
        removeCoookieWarning();
      }
    });

    function displayCookieWarning(){
      // Using Angular's jqLite
      // var warningElem = element.find("div");
      // console.log(warningElem);
      // warningElem.css('display', 'block');

      // If jQuey is included before Angular
      var warningElem = element.find("div.error");
      warningElem.slideDown(900);
    };

    function removeCoookieWarning(){
      // Using Angular's jqLite
      // var warningElem = element.find("div");
      // warningElem.css('display', 'none');

      // If jQuey is included before Angular
      var warningElem = element.find("div.error");
      warningElem.slideUp(900);

    };
  };

  function ShoppingListComponentController(){
    var $ctrl = this;
    $ctrl.cookiesInList = function(){
      for (var i = 0; i < $ctrl.items.length; i++){
        var name = $ctrl.items[i].name;
        if (name.toLowerCase().indexOf("cookie") !== -1){
          return true;
        }
      }
      return false;
    };
    $ctrl.remove = function(myIndex){
      $ctrl.onRemove({ index: myIndex });
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

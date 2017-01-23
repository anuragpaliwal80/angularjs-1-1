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
      myTitle: '@title', // DOM attribute value binding
      onRemove: '&' // Reference binding
    }
  });

  ShoppingListComponentController.$inject = ['$scope','$element'];
  function ShoppingListComponentController($scope,$element){
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

    $ctrl.$onInit = function(){
      console.log("we are in onInit");
    };

    $ctrl.$onChanges = function(changeObj){
      console.log("changeObj is: ", changeObj);
    };

    $ctrl.$postLink = function(){
      $scope.$watch('$ctrl.cookiesInList()',function(newValue,oldValue){
        console.log($element);
        if (newValue === true){
          // Show warning
          var warningElem = $element.find('div.error');
          warningElem.slideDown(900);
        }else {
          //Hide warning
          var warningElem = $element.find('div.error');
          warningElem.slideUp(900);
        }
      });
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

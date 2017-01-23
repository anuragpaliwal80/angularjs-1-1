(function(){
  'use strict';

  angular.module('ShoppingListEventApp',[])
  .controller('ShoppingListController', ShoppingListController)
  .factory('ShoppingListFactory',ShoppingListFactory)
  .service('WeightLossFilterService',WeightLossFilterService)
  .component('shoppingList',{
    templateUrl: 'shoppingList.html',
    controller: ShoppingListComponentController,
    bindings: {
      items: "<", // One way binding
      myTitle: '@title', // DOM attribute value binding
      onRemove: '&' // Reference binding
    }
  })
  .component('loadingSpinner',{
    templateUrl: 'spinner.html',
    controller: SpinnerController
  });

  SpinnerController.$inject = ['$rootScope'];
  function SpinnerController($rootScope){
    var $ctrl = this;
    // Listner
    var cancelLisner = $rootScope.$on('shoppinglist:processing',function(event,data){
      console.log("Event: ",event);
      console.log("Data: ",data);

      if(data.on){
        $ctrl.showSpinner = true;
      }else {
        $ctrl.showSpinner = false;
      }
    });
    $ctrl.$onDestroy = function(){
      cancelLisner();
    };
  };

  ShoppingListComponentController.$inject = ['$rootScope','$element','$q',
  'WeightLossFilterService'];
  function ShoppingListComponentController($rootScope,$element,$q,
  WeightLossFilterService){
    var $ctrl = this;
    var totalItems;

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
      totalItems = 0;
    };

    $ctrl.$onChanges = function(changeObj){
      console.log("changeObj is: ", changeObj);
    };

    $ctrl.$doCheck = function(){
      if($ctrl.items.length !== totalItems){
        console.log("Number of items changed");
        totalItems = $ctrl.items.length;
        $rootScope.$broadcast('shoppinglist:processing',{on: true});
        var promises = [];
        for (var i =0; i < $ctrl.items.length; i++){
          promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
        }
        $q.all(promises)
        .then(function(result){
          // remove cookie warning
          var warningElem = $element.find('div.error');
          warningElem.slideUp(900);
        })
        .catch(function(result){
          // show cookie warning
          var warningElem = $element.find('div.error');
          warningElem.slideDown(900);
        })
        .finally(function(){
          $rootScope.$broadcast('shoppinglist:processing', {on: false});
        });
      }
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

WeightLossFilterService.$inject = ['$q', '$timeout']
function WeightLossFilterService($q, $timeout) {
  var service = this;

  service.checkName = function (name) {
    var deferred = $q.defer();

    var result = {
      message: ""
    };

    $timeout(function () {
      // Check for cookies
      if (name.toLowerCase().indexOf('cookie') === -1) {
        deferred.resolve(result)
      }
      else {
        result.message = "Stay away from cookies, Anurag!";
        deferred.reject(result);
      }
    }, 3000);

    return deferred.promise;
  };


  service.checkQuantity = function (quantity) {
    var deferred = $q.defer();
    var result = {
      message: ""
    };

    $timeout(function () {
      // Check for too many boxes
      if (quantity < 6) {
        deferred.resolve(result);
      }
      else {
        result.message = "That's too much, Anurag!";
        deferred.reject(result);
      }
    }, 1000);

    return deferred.promise;
  };
};

})();

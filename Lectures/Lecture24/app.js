(function(){
  'use strict';

  angular.module('ShoppingListPromiseApp',[])
  .controller('ShoppingListController', ShoppingListController)
  .service('ShoppingListService',ShoppingListService)
  .service('WeigthLossFilterService',WeigthLossFilterService);

  ShoppingListController.$inject = ['ShoppingListService'];
  function ShoppingListController(ShoppingListService){
    var list = this;
    list.items = ShoppingListService.getItems();

    list.itemName = "";
    list.itemQuantity = "";

    list.addItem = function(){
      try{
        ShoppingListService.addItem(list.itemName,list.itemQuantity);
      }catch(error){
        list.errorMessage = error.message;
      }
    };
    list.removeItem = function(itemIndex){
      ShoppingListService.removeItem(itemIndex);
    };
  };

ShoppingListService.$inject = ['$q','WeigthLossFilterService'];
function ShoppingListService($q,WeigthLossFilterService){
  var service = this;
  var items = [];
  // service.addItem = function(name,quantity){
  //   var promise = WeigthLossFilterService.checkName(name);
  //   promise.then(function(response){
  //     var nextPromise = WeigthLossFilterService.checkQuantity(quantity);
  //     nextPromise.then(function(result){
  //       var item = {
  //         name: name,
  //         quantity: quantity
  //       };
  //       items.push(item);
  //     },function(errorResponse){
  //       console.log(errorResponse.message);
  //     });
  //   },function(errorResponse){
  //     console.log(errorResponse.message);
  //   });
  // };
  // service.addItem = function(name,quantity){
  //   var promise = WeigthLossFilterService.checkName(name);
  //   promise
  //   .then(function(response){
  //     return WeigthLossFilterService.checkQuantity(quantity);
  //   })
  //   .then(function(response){
  //       var item = {
  //         name: name,
  //         quantity: quantity
  //       };
  //       items.push(item);
  //     })
  //   .catch(function(errorResponse){
  //     console.log(errorResponse.message);
  //   });
  // };
  service.addItem = function(name,quantity){
    var namePromise = WeigthLossFilterService.checkName(name);
    var quantityPromise = WeigthLossFilterService.checkQuantity(quantity);
    $q.all([namePromise,quantityPromise])
    .then(function(response){
        var item = {
          name: name,
          quantity: quantity
        };
        items.push(item);
      })
    .catch(function(errorResponse){
      console.log(errorResponse.message);
    });
  };
  service.removeItem = function(itemIndex){
    items.splice(itemIndex,1);
  };
  service.getItems = function () {
      return items;
  };
};

WeigthLossFilterService.$inject = ['$q','$timeout'];
function WeigthLossFilterService($q,$timeout){
  var service = this;
  service.checkName = function(name){
    var deferred = $q.defer();
    var result = {
      message: ""
    };

    $timeout(function(){
      // Check for Cookies
      if(name.toLowerCase().indexOf('cookie') === -1) {
        deferred.resolve(result)
      }
      else {
        result.message = "Stay Way from Cookies, Anurag!!!";
        deferred.reject(result);
      }
    }, 3000);

    return deferred.promise;
  };

  service.checkQuantity = function(quantity){
    var deferred = $q.defer();
    var result = {
      message: ""
    };

    $timeout(function(){
      // Check for Cookies
      if(quantity < 6) {
        deferred.resolve(result)
      }
      else {
        result.message = "It's too much, Anurag!!!";
        deferred.reject(result);
      }
    }, 1000);

    return deferred.promise;
  };
};

})();

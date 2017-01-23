(function(){
  'use strict';

  angular.module('ShoppingList')
  .service('ShoppingListService',ShoppingListService);

  ShoppingListService.$inject = ['$q', '$timeout']
  function ShoppingListService($q, $timeout) {
    var service = this;

    var items = [];

    items.push({
      name: "Sugar",
      quantity: "2 bags",
      description: "Suger to bake ...."
    });
    items.push({
      name: "Flour",
      quantity: "4 bags",
      description: "Flour is used to ...."
    });
    items.push({
      name: "Chocolate Chips",
      quantity: "2 bags",
      description: "Yummy ...."
    });

    //Simulate call to server
    // Return a promise and not ITEMS array directly
    service.getItems = function(){
      var deferred = $q.defer();
      //Wait for 2 sec before returning
      $timeout(function () {
        // deferred.reject(items);
        deferred.resolve(items);
      }, 800);
      return deferred.promise;
    };
  };

})();

(function(){
  'use strict';

  angular.module('ShoppingList') // Retriving the module and not declaring
  .component('shoppingList',{
    templateUrl: 'src/shoppinglist/shoppinglist.template.html',
    controller: ShoppingListComponentController,
    bindings: {
      items: "<", // One way binding
      myTitle: '@title', // DOM attribute value binding
      onRemove: '&' // Reference binding
    }
  });

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
  
})();

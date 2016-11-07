(function(){
  'use strict';
  var shoppingList = ["Milk","Donuts","Cookies","Rich Cookies"];
  angular.module('ShoppingListApp',[])
  .controller('ShoppingListController', ShoppingListController);
  ShoppingListController.$inject = ['$scope'];
  function ShoppingListController($scope){
    $scope.shoppingList = shoppingList;
  };
})();

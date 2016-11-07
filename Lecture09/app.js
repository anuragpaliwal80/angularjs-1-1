(function(){
  'use strict';
  angular.module('NameCalculator',[])
  .controller('NameCalculatorController', NameCalculatorController);
  NameCalculatorController.$inject = ['$scope','$filter'];
  function NameCalculatorController($scope,$filter){
    $scope.name = "";
    $scope.upper = function(){
      var upCase = $filter('uppercase');
      $scope.name = upCase($scope.name);
    };
  };
})();

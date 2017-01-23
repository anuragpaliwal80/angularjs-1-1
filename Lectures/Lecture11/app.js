(function(){
  'use strict';
  angular.module('MsgApp',[])
  .controller('MsgController', NameCalculatorController);
  NameCalculatorController.$inject = ['$scope'];
  function NameCalculatorController($scope){
    $scope.name = "";
    $scope.stateOfBeing = "hungry";
    $scope.cookieCost = .45;
    $scope.feedAnurag = function(){
      $scope.stateOfBeing = "fed";
    };
  };
})();

(function(){
  'use strict';
  angular.module('MsgApp',[])
  .controller('MsgController', NameCalculatorController);
  NameCalculatorController.$inject = ['$scope'];
  function NameCalculatorController($scope){
    $scope.name = "";
    $scope.stateOfBeing = "hungry";
    $scope.feedAnurag = function(){
      $scope.stateOfBeing = "fed";
    };
  };
})();

(function(){
  'use strict';
  angular.module('MsgApp',[])
  .controller('MsgController', NameCalculatorController)
  .filter('loves',LovesFilter)
  .filter('truth',TruthFilter);
  NameCalculatorController.$inject = ['$scope','lovesFilter'];
  function NameCalculatorController($scope,lovesFilter){
    $scope.name = "";
    $scope.stateOfBeing = "hungry";
    $scope.sayMessage = function(){
      return "Anurag likes abc!!"
    };
    $scope.sayLoveMessage = function(){
      var msg = "Anurag likes abc!!";
       msg = lovesFilter(msg);
       return msg;
    };
    $scope.feedAnurag = function(){
      $scope.stateOfBeing = "fed";
    };
  };
  function LovesFilter(){
    return function(input){
      input = input || "";
      input = input.replace("likes","love");
      return input;
    };
  };
  function TruthFilter(){
    return function(input,target,replace){
      input = input || "";
      input = input.replace(target,replace);
      return input;
    };
  };
})();

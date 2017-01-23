(function(){
  'use strict';
  angular.module('myFirstApp',[])
  .controller('MyFirstController',function($scope){
    $scope.name = "Anurag"
    $scope.sayHello = function(){
      return "Hello AP";
    };
  });
})();

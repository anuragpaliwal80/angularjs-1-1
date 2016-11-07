(function(){
  'use strict';
  angular.module('BindingApp',[])
  .controller('BindingController', BindingController);
  BindingController.$inject = ['$scope'];
  function BindingController($scope){
    $scope.firstName = "Anurag";
    //$scope.fullName = "";

    $scope.showNumberOfWatchers = function(){
      console.log("# of Watchers: ", $scope.$$watchersCount);
    };

    $scope.setFullName = function(){
      $scope.fullName = $scope.firstName + " " + "Paliwal";
    };

    $scope.logFirstName = function(){
      console.log("First Name: ", $scope.firstName);
    };

    $scope.logFullName = function(){
      console.log("Full Name: ", $scope.fullName);
    };
  };
})();

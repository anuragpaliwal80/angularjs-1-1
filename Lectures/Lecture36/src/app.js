(function(){
  'use strict';

  angular.module('RoutingApp',['ui.router']);

  angular.module('RoutingApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
  function RoutesConfig($stateProvider,$urlRouterProvider){
    // Redirect to tab1 in no ther url matches
    $urlRouterProvider.otherwise('/tab1');

    // Set Up UI stats
    $stateProvider
      .state('tab1', {
        url: '/tab1',
        template: '<div>This is tab1</div>'
      })
      .state('tab2', {
        url: '/tab2',
        template: '<div>This is tab2</div>'
      });
  };

})();

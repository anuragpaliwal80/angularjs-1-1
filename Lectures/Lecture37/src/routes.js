(function(){
  'use strict';

  angular.module('ShoppingList')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
  function RoutesConfig($stateProvider,$urlRouterProvider){
    // Redirect to / in no ther url matches
    $urlRouterProvider.otherwise('/');

    // Set Up UI stats
    //Home Page
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/src/shoppinglist/templates/home.template.html'
      })
      // Premade list
      .state('mainList', {
        url: '/main-list',
        templateUrl: '/src/shoppinglist/templates/main-shoppinglist.template.html',
        controller: 'MainShoppingListController as mainList'
      });
  };

})();

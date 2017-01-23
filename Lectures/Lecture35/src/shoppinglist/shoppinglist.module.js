(function(){
  'use strict';
  // declaring the module as we are using []
  angular.module('ShoppingList',['Spinner']);

  angular.module('ShoppingList')
  .config(function(){
    console.log("ShoppingList Config Fired!!!")
  })
  .run(function(){
    console.log("ShoppingList Run Fired!!!");
  });

})();

(function(){
  'use strict';

  angular.module('Spinner',[]); // declaring the module as we are using []

  angular.module('Spinner')
  .config(function(){
    console.log("Spinner Config Fired!!!")
  })
  .run(function(){
    console.log("Spinner Run Fired!!!");
  });
})();

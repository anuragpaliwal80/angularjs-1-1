(function(){
  'use strict';

  angular.module('ShoppingList') // Retriving the module and not declaring
  .component('shoppingList', {
    templateUrl: '/src/shoppinglist/templates/shoppinglist.template.html',
    bindings: {
      items: "<" // One way binding
    }
  });

})();

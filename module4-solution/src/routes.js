(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('homeView', {
    url: '/',
    templateUrl: 'src/restaurant/templates/home.template.html'
  })


  .state('categoriesView', {
    url: '/categoriesView',
    templateUrl: 'src/restaurant/templates/main-categories.template.html',
    controller: 'MainCategoriesController as mainCategories',
    resolve: {
        promise: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('itemsView', {
      url: '/itemsView/{shortName}/{categoryName}',
      templateUrl: 'src/restaurant/templates/items.template.html',
      controller: 'ItemsDetailsController as itemsDetails',
      resolve: {
          itemsPromise: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.shortName);
          }],
          categoryInfo: ['$stateParams', function ($stateParams) {
              return $stateParams.categoryName;
          }]
      }
  })

}

})();

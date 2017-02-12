(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('MainCategoriesController', MainCategoriesController);

    MainCategoriesController.$inject = ['promise'];
    function MainCategoriesController(promise) {
        var mainCategories = this;
        console.log(promise);
        mainCategories.categories = promise.data;
    }

})();

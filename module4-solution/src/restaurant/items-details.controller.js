(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsDetailsController', ItemsDetailsController);

// 'items' is injected through state's resolve
    ItemsDetailsController.$inject = ['itemsPromise',  'categoryInfo'];
    function ItemsDetailsController(itemsPromise, categoryInfo) {
        var itemsDetailsCtrl = this;
        itemsDetailsCtrl.items = itemsPromise.data.menu_items;
        itemsDetailsCtrl.category = categoryInfo;

    }

})();

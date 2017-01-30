(function () {
    'use strict';

angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItems);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var itemsCtrl = this;

    itemsCtrl.items = [];

    itemsCtrl.performSearch = function (searchTerm) {
        itemsCtrl.items = MenuSearchService(searchTerm);
    }
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {

        var filteredItems = [];

        var promise = $http({
            method: "GET",
            url: "https://davids-restaurant.herokuapp.com/menu_items.json"
        }).success(function (data) {
            var foundItems  = data.menu_items;

            for (var i = 0; i < foundItems.length; i++){
                var desc = foundItems[i].description;
                if (desc.toLocaleLowerCase().indexOf(searchTerm) !== -1){
                    filteredItems.push(foundItems[i]);
                }
            }
        });

        return filteredItems;
    };
}

function FoundItems() {
    var ddo = {
        templateUrl: 'menuList.html',
        scope: {
            foundItems: '<',
            onRemove: '&'
        }
    };
}



})();


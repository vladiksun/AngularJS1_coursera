(function () {
    'use strict';

angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItems);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var itemsCtrl = this;

    itemsCtrl.searchTerm = "";
    itemsCtrl.resultHolder = {
                                 searchTerm: "",
                                 items: [],
                                 isInitial: true,
                                 isLoading: false
                             };


    itemsCtrl.performSearch = function () {
        MenuSearchService.getMatchedMenuItems(itemsCtrl.resultHolder);
    };

    itemsCtrl.removeItem = function (index) {
        itemsCtrl.resultHolder.items.splice(index,1);
        if (itemsCtrl.resultHolder.items.length === 0){
            itemsCtrl.resultHolder.isInitial = true;
        }
    }
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function (resultHolder) {
        var filteredItems = [];
        resultHolder.isLoading = true;

        if (resultHolder.searchTerm !== ""){
            var promise = $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            }).success(function (data) {
                var foundItems  = data.menu_items;

                for (var i = 0; i < foundItems.length; i++){
                    var desc = foundItems[i].description;
                    if (desc.toLocaleLowerCase().indexOf(resultHolder.searchTerm) !== -1){
                        filteredItems.push(foundItems[i]);
                    }
                }

                resultHolder.items = filteredItems;
                resultHolder.isInitial = false;
                resultHolder.isLoading = false;
            });
        }
        else {
            resultHolder.items = filteredItems;
            resultHolder.isInitial = false;
            resultHolder.isLoading = false;
        }

        return resultHolder;

    };
}

function FoundItems() {
    var ddo = {
        templateUrl: 'menuList.html',
        scope: {
            resultHolder: '<',
            onRemove: '&'
        },
        controller: FoundItemsDirectiveController,
        controllerAs: 'list',
        bindToController: true
    };

    return ddo;
}

function FoundItemsDirectiveController() {
    var directiveCtrl = this;

    directiveCtrl.isListEmpty = function () {
        if (directiveCtrl.resultHolder.items.length > 0){
            return false;
        }
        return true;
    };
}

})();


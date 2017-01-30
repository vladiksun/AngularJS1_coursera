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
    itemsCtrl.items = [];

    itemsCtrl.performSearch = function () {
        if (itemsCtrl.searchTerm !== ""){
            itemsCtrl.items = MenuSearchService.getMatchedMenuItems(itemsCtrl.searchTerm);
        }
    };

    itemsCtrl.removeItem = function (index) {
        itemsCtrl.items.splice(index,1);
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
            items: '<',
            onRemove: '&'
        },
        controller: FoundItemsDirectiveController,
        controllerAs: 'list',
        bindToController: true,
        link: FoundItemsDirectiveLink,
        transclude: true
    };

    return ddo;
}

function FoundItemsDirectiveLink(scope, element, attrs, controller) {
    console.log("Link scope is: ", scope);
    console.log("Controller instance is: ", controller);
    console.log("Element is: ", element);

    scope.$watch('list.isListEmpty()', function (newValue, oldValue) {
        if (newValue === true) {
            alert(newValue);
            displayMessageNotFound();
        }
        else {
            hideMessageNotFound();
        }
    });

    function displayMessageNotFound() {
        var warningElem = element.find("div.notFound");
        warningElem.slideDown(900);
    }

    function hideMessageNotFound() {
        // If jQuery included before Angular
        var warningElem = element.find('div.notFound');
        warningElem.slideUp(900);
    }
}


function FoundItemsDirectiveController() {
    var directiveCtrl = this;

    directiveCtrl.isListEmpty = function () {
        if (directiveCtrl.items.length > 0){
            return false;
        }
        return true;
    };
}

})();


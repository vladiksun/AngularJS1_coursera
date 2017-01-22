(function () {
    'use strict';

angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController (ShoppingListCheckOffService) {
    var toBuyList = this;

    toBuyList.items = ShoppingListCheckOffService.getToBuyItems();
    
    toBuyList.checkAsBought = function (itemIndex) {
        ShoppingListCheckOffService.checkAsBought(itemIndex);
    }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController (ShoppingListCheckOffService) {
    var boughtList = this;
    boughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = [
        { name: "cookies", quantity: 10 },
        { name: "waffles", quantity: 20 },
        { name: "cola bottles", quantity: 10 },
        { name: "candies", quantity: 10 },
        { name: "beer bottles", quantity: 10 }
    ];
    var boughtItems = [];

    service.getToBuyItems = function () {
        return toBuyItems;
    };

    service.getBoughtItems = function () {
        console.log(boughtItems.length);
        return boughtItems;
    };

    service.checkAsBought = function (itemIndex) {
        var itemToCheck = toBuyItems[itemIndex];
        toBuyItems.splice(itemIndex, 1);
        boughtItems.push(itemToCheck);

    };
}

})();


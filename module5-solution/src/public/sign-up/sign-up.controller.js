(function () {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);


    SignUpController.$inject = ['MenuService'];
    function SignUpController(MenuService) {
        var $ctrl = this;
        $ctrl.isInitial = true;

        $ctrl.submit = function () {
            var promise = MenuService.getMenuItemByShortName($ctrl.user.menuNumber);

            promise.then(function (response) {
                $ctrl.user.item = response.data;
                MenuService.saveUserData($ctrl.user);
                console.log(MenuService.getUserData());
            })
            .catch(function (error) {
                    console.log(error);
                })
            .finally(function () {
                $ctrl.isInitial = false;
            });
        };

        $ctrl.checkData = function () {
            if(MenuService.getUserData())
            {
                return true;
            }
            else {
                return false;
            }
        }
    }

})();

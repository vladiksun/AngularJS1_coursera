(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);


    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController ($scope) {
        $scope.message = '';
        $scope.checkItems = function () {
            $scope.items = [];

            if ($scope.textInput){
                $scope.items = $scope.textInput.split(',');
            }

            if ($scope.items.length == 0){
                $scope.message = 'Please enter data first!';
            }
            else if ($scope.items.length <= 3) {
                $scope.message = 'Enjoy!';
            }
            else {
                $scope.message = 'Too much!';
            }
        }
    }
})();


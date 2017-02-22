(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['userData', 'ApiPath'];
function MyInfoController(userData, ApiPath) {
  var $ctrl = this;
  $ctrl.userData = userData;
  $ctrl.basePath = ApiPath;
}

})();

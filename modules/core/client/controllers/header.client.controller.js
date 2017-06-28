(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', 'Authentication', 'Navs'];

  function HeaderController($scope, $state, Authentication, Navs) {
    var vm = this;

    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.isOpenTopMenu = false;
    vm.nav = Navs.getNav('topbar');
  }
}());

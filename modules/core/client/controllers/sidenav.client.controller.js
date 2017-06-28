(function () {
  'use strict';

  angular
    .module('core')
    .controller('SidenavController', SidenavController);

  SidenavController.$inject = ['$scope', '$state', 'Authentication', 'sideNavs'];

  function SidenavController($scope, $state, Authentication, sideNavs) {
    var vm = this;

    vm.authentication = Authentication;
    vm.$state = $state;
    vm.sideNav = sideNavs.getSideNav('sidebar');

    // close mobile menu when user click
    vm.menuClick = function () {
      vm.menuToogle = false;
    };

    /* Initial sideNav, open or not */
    if (localStorage.sideblock) {
      vm.sideblock = (localStorage.sideblock === 'true');
    } else {
      vm.sideblock = false;
      localStorage.setItem('sideblock', vm.sideblock);
    }
    if (vm.sideblock) $('.wrapper').toggleClass('toggled');

    vm.setSideblock = function () {
      vm.sideblock = !vm.sideblock;
      localStorage.sideblock = vm.sideblock;
      $('.wrapper').toggleClass('toggled');
    };

  }
}());

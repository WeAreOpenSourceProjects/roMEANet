(function () {
  'use strict';

  angular
    .module('core')
    .controller('SidenavController', SidenavController);

  SidenavController.$inject = ['$scope', '$state', 'Authentication', 'sideNavs', '$mdMedia'];

  function SidenavController($scope, $state, Authentication, sideNavs, $mdMedia) {
    var vm = this;

    vm.authentication = Authentication;
    vm.$state = $state;
    vm.sideNav = sideNavs.getSideNav('sidebar');
    vm.sideblock = false;
    vm.sideNavLock = false;
    /* Initial sideNav */
    init();

    function init() {
      if (getCookie('pin') === 'true') {
        $('.wrapper').toggleClass('toggled');
        vm.sideNavLock = true;
      }
    }
    /* Pin sideNav */
    vm.changePinStatus = function () {
      if (getCookie('pin') === '') {
        setCookie('pin', 'true', 365);
        vm.sideNavLock = true;
      } else {
        if (getCookie('pin') === 'true') {
          setCookie('pin', 'false', 365);
          vm.sideNavLock = false;
          toggleNav();
        } else {
          setCookie('pin', 'true', 365);
          vm.sideNavLock = true;
        }
      }
    };

    /* SideNav toggle operation */
    $('.dropdown-toggle').click(function (e) {
      toggleNav();
    });

    function toggleNav() {
      $('.wrapper').toggleClass('toggled');
    }
    /* Media queries for pin */
    vm.isNormalScreen = $mdMedia('(min-width: 768px)');
    $scope.$watch(function () {
      return $mdMedia('(min-width: 768px)');
    }, function () {
      vm.isNormalScreen = $mdMedia('(min-width: 768px)');
    });
    /* Cookie operation */
    function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = 'expires=' + d.toGMTString();
      document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    }

    function getCookie(cname) {
      var name = cname + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    }

    function clearCookie(cname) {
      setCookie('cname', '', -1);
    }
    vm.setSideblock = function () {
      vm.sideblock = !vm.sideblock;
    };
  }
}());

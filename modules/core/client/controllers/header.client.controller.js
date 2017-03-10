(function() {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', 'Authentication', 'Navs', '$mdDialog', '$mdMedia'];

  function HeaderController($scope, $state, Authentication, Navs, $mdDialog, $mdMedia) {
    var vm = this;

    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.nav = Navs.getNav('topbar');
    vm.nav_mobile = Navs.getNav('topbar_mobile');

    vm.openToolBox = openToolBox; //openToolBox
    vm.isOpenToolBox = false;
    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    /*Media queries for toolbox*/
    vm.isNormalScreen = $mdMedia('(min-width: 768px)');
    $scope.$watch(function() {
      return $mdMedia('(min-width: 768px)');
    }, function() {
      console.log("screnn size change");
      vm.isNormalScreen = $mdMedia('(min-width: 768px)');
    });

    function stateChangeSuccess() {
      // Collapsing the sideNavmenu after navigation
      vm.isCollapsed = false;
      if ($(".wrapper").hasClass("toggled")&&!vm.isNormalScreen) {
        console.log("removing toggle");
        $(".wrapper").removeClass("toggled");
        return false;
      }
    }
    /*Open submenu*/
    function openToolBox() {
      vm.isOpenToolBox = vm.isOpenToolBox ? false : true;
    }
    console.log(vm.nav.items[1]);
    console.log(vm.authentication.user);
    console.log(vm.nav.items[0].shouldRender(vm.authentication.user));
    console.log(vm.nav.items[1].shouldRender(vm.authentication.user));
  }
}());

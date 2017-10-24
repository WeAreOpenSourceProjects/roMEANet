(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserListController', UserListController);

  UserListController.$inject = ['$scope', '$filter', 'AdminService'];

  function UserListController($scope, $filter, AdminService) {
    var vm = this;
    vm.itemsPerPageChoice = [5, 10, 20, 50].map(function (v) {
      return {
        abbrev: v
      };
    });
    vm.itemsPerPage = 5;

    AdminService.query(function (data) {
      vm.users = data;
    });

  }
}());

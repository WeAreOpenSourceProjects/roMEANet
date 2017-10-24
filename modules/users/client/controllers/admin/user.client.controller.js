(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserController', UserController);

  UserController.$inject = ['$scope', '$state', '$window', 'Authentication', 'userResolve', 'availableRolesResolve', '$element'];

  function UserController($scope, $state, $window, Authentication, user, availableRoles, $element) {
    var vm = this;

    vm.authentication = Authentication;
    vm.user = user;
    vm.availableRolesList = '';
    vm.remove = remove;
    vm.update = update;
    vm.isContextUserSelf = isContextUserSelf;

    // Search in select
    vm.searchTerm = '';
    vm.clearSearchTerm = clearSearchTerm;

    function remove(user) {
      if ($window.confirm('Are you sure you want to delete this user?')) {
        if (user) {
          user.$remove();

          vm.users.splice(vm.users.indexOf(user), 1);
        } else {
          vm.user.$remove(function () {
            $state.go('admin.users');
          });
        }
      }
    }

    function update(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      var user = vm.user;

      user.$update(function () {
        $state.go('admin.user', {
          userId: user._id
        });
      }, function (errorResponse) {
        vm.error = errorResponse.data.message;
      });
    }

    function isContextUserSelf() {
      return vm.user.username === vm.authentication.user.username;
    }

    function clearSearchTerm() {
      vm.searchTerm = '';
    }

    /* VIEW INIT */
    $element.find('input').on('keydown', function (ev) {
      ev.stopPropagation();
    });

    vm.availableRolesList = availableRoles;
  }
}());

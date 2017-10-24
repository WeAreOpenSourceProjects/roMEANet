(function () {
  'use strict';


  // TODO this should be Users service
  angular
    .module('users.admin.services')
    .factory('AdminService', AdminService);

  AdminService.$inject = ['$resource'];

  function AdminService($resource) {
    return $resource('/api/users/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }

  /**
   * Admin Service Roles
   **/
  angular
    .module('users.admin.services')
    .factory('AdminServiceRoles', AdminServiceRoles);

  AdminServiceRoles.$inject = ['$resource'];

  function AdminServiceRoles($resource) {
    return $resource('/api/admin/users/roles');
  }
}());

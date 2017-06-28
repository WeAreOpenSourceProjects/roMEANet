(function () {
  'use strict';

  angular
    .module('users.admin')
    .run(menuConfig);

  menuConfig.$inject = ['Navs'];

  // Configuring the Users module
  function menuConfig(Navs) {
    Navs.addSubNavItem('topbar', 'admin', {
      title: 'Manage Users',
      state: 'admin.users',
      icon: 'fa-users', // https://fortawesome.github.io/Font-Awesome/
      roles: ['admin']
    });
  }
}());

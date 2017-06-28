
(function() {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('articles.admin')
    .run(menuConfig);

  menuConfig.$inject = ['Navs'];

  function menuConfig(Navs) {
    /**
     * Globals vars
     */
    var _appAdmin = {
      title: 'Manage Articles',
      version: '1.0.0',
      state: 'admin.articles.list', // main route
      icon: 'fa-lock', // https://fortawesome.github.io/Font-Awesome/
      roles: ['admin']
      // type: 'dropdown'
    };
    /**
     * Nav Bar Top
     */
    Navs.addSubNavItem('topbar', 'admin', {
      title: _appAdmin.title,
      icon: _appAdmin.icon,
      state: _appAdmin.state,
      roles: _appAdmin.roles,
      type: _appAdmin.type
    });
  }
}());

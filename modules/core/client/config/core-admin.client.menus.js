(function() {
  'use strict';

  angular
    .module('core.admin')
    .run(menuConfig);

  menuConfig.$inject = ['Navs', 'sideNavs'];

  function menuConfig(Navs, sideNavs) {
    /**
     * Globals vars
     */
    var _appHome = {
      name: 'Home',
      version: '1.0.0',
      state: 'home', // main route
      view: 'home',
      icon: 'fa-home', // https://fortawesome.github.io/Font-Awesome/
      color: '#24272d', // https://flatuicolors.com/ (sideNav)
      fontColor: '#fff', // https://flatuicolors.com/ (sideNav)
      position: 0, // default 1
      roles: ['*']
    };
    var _appMobileToolBox = {
      name: 'ToolBox',
      version: '1.0.0',
      state: 'toolbox', // main route
      // view: 'home',
      icon: 'fa-cog', // https://fortawesome.github.io/Font-Awesome/
      color: '#24272d', // https://flatuicolors.com/ (sideNav)
      fontColor: '#fff', // https://flatuicolors.com/ (sideNav)
    //  type: 'dropdown-menu',
    //  position: 0, // default 1
      roles: ['*']
    };
    var _appAdmin = {
      name: 'Admin',
      version: '1.0.0',
      state: 'admin', // main route
      icon: 'fa-user-secret', // https://fortawesome.github.io/Font-Awesome/
      roles: ['admin'],
      type: 'dropdown'
    };
    /**
     * Nav Bar Top
     */
    Navs.addNavItem('topbar', {
      title: _appAdmin.name,
      icon: _appAdmin.icon,
      state: _appAdmin.state,
      roles: _appAdmin.roles,
      type: _appAdmin.type
    });

    Navs.addNavItem('topbar_mobile', {
      title: _appMobileToolBox.name,
      icon: _appMobileToolBox.icon,
      state: _appMobileToolBox.state,
      roles: _appMobileToolBox.roles,
      type: _appMobileToolBox.type
    });

    /**
     * Side Bar left
     */
    sideNavs.addSideNavItem('sidebar', {
      title: _appHome.name,
      state: _appHome.state,
      view: _appHome.view,
      icon: _appHome.icon,
      color: _appHome.color, // https://flatuicolors.com/ (sideNav)
      fontColor: _appHome.fontColor, // https://flatuicolors.com/ (sideNav)
      position: _appHome.position,
      roles: _appHome.roles
    });
  }
}());

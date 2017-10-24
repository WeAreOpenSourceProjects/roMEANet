(function () {
  'use strict';

  angular
    .module('articles')
    .run(menuConfig)
    .constant('appInformation', {
      view: '/home'
    });

  menuConfig.$inject = ['sideNavs'];

  function menuConfig(sideNavs) {
    /*
     * Globals vars
     */
    var _app = {
      title: 'Articles',
      version: '1.0.0',
      view: 'home', // app view
      state: 'articles.list', // link route
      icon: 'fa-newspaper-o', // https://fortawesome.github.io/Font-Awesome/
      color: '#3e454e', // https://flatuicolors.com/ (sideNav)
      fontColor: '#fff', // https://flatuicolors.com/ (sideNav)
      position: 1, // default 1
      roles: ['*', 'user', 'admin']
    };

    sideNavs.addSideNavItem('sidebar', {
      title: _app.title,
      icon: _app.icon,
      color: _app.color,
      fontColor: _app.fontColor,
      state: _app.state,
      view: _app.view,
      roles: _app.roles,
      position: _app.position
    });

  }
}());

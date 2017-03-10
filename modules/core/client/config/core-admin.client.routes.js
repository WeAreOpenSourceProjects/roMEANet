(function () {
  'use strict';

  angular
    .module('core.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      })
      .state('toolbox.articlesList', {
        url: '/articleList',
        templateUrl: '/modules/articles/client/views/admin/list-articles.client.view.html',
        controller: 'ArticlesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      });
  }
}());

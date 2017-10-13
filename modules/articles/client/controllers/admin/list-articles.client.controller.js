(function () {
  'use strict';

  angular
    .module('articles.admin')
    .controller('ArticlesAdminListController', ArticlesAdminListController);

  ArticlesAdminListController.$inject = ['ArticlesService'];

  function ArticlesAdminListController(ArticlesService) {
    var vm = this;
    vm.itemsPerPageChoice = [5, 10, 20, 50].map(function (v) {
      return {
        abbrev: v
      };
    });
    vm.itemsPerPage = 5;

    vm.articles = ArticlesService.query();
  }
}());

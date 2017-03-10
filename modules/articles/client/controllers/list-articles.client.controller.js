(function () {
  'use strict';

  angular
    .module('articles')
    .controller('ArticlesListController', ArticlesListController);

  ArticlesListController.$inject = ['ArticlesService'];

  function ArticlesListController(ArticlesService) {
    var vm = this;
    vm.itemsPerPageChoice = [5, 10, 20, 50].map(function (v) { return { abbrev: v }; });
    vm.itemsPerPage = 5;

    vm.articles = ArticlesService.query();
  }
}());

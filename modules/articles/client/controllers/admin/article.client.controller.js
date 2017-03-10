
(function() {
  'use strict';

  angular
    .module('articles.admin')
    .controller('ArticlesAdminController', ArticlesAdminController);

  ArticlesAdminController.$inject = ['$scope', '$state', '$window', 'articleResolve', 'Authentication', '$mdToast'];

  function ArticlesAdminController($scope, $state, $window, article, Authentication, $mdToast) {
    var vm = this;

    vm.article = article;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.article.$remove(function() {
          $state.go('admin.articles.list');
          $mdToast.show($mdToast.simple().textContent('Article deleted successfully!').position('top right').hideDelay(5000));
        });
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.articleForm');
        return false;
      }

      // Create a new article, or update the current instance
      vm.article.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.articles.list'); // should we send the User to the list or the updated Article's view?
        $mdToast.show($mdToast.simple().textContent('Article saved successfully!').position('top right').hideDelay(5000));
      }

      function errorCallback(res) {
        $mdToast.show($mdToast.simple().textContent('Article save error ! ' + res.data.message).position('top right').hideDelay(5000));
      }
    }
  }
}());

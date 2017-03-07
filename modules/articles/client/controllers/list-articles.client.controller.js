(function() {
  'use strict';

  angular
    .module('articles')
    .controller('ArticlesListController', ArticlesListController);

  ArticlesListController.$inject = ['ArticlesService', '$mdToast', '$state'];

  function ArticlesListController(ArticlesService, $mdToast, $state) {
    var vm = this;
    vm.itemsPerPageChoice = [5, 10, 20, 50].map(function(v) {
      return {
        abbrev: v
      };
    });
    vm.itemsPerPage = 5;

    vm.articles = ArticlesService.query();
    vm.comment = {
      body: "",
      created: null,
      user: null
    };
    vm.form = {};

/*    function submitComment(articleID, isValid) {
      var article;
      //get article
      ArticlesService.get({
        articleId: articleID
      }).$promise.then(function(res) {
        console.log("promised");
        article = res;
        //every time just submit current comment
        article.comments = [vm.comment];
        if (!isValid) {
          $scope.$broadcast('show-errors-check-validity', 'vm.form.articleForm');
          return false;
        }

        // Create a new article, or update the current instance
        article.createOrUpdate()
          .then(successCallback)
          .catch(errorCallback);

      });

      function successCallback(res) {
        $state.reload(); // should we send the User to the list or the updated Article's view?
        $mdToast.show($mdToast.simple().textContent('Comment submitted successfully!').position('top right').hideDelay(5000));

      }

      function errorCallback(res) {
        $mdToast.show($mdToast.simple().textContent('Article save error ! ' + res.data.message).position('top right').hideDelay(5000));
      }
    }

    function addComment(e) {
      var elem = angular.element(e.currentTarget);
      //show comment input
      console.log(elem.parent("md-list").children("form"));
      elem.css("display","none");
      elem.parent("md-list").children("form").css("display","block");
      console.log(angular.element(document.getElementsByClassName('input-comment-box')));
    }
    */
  }
}());

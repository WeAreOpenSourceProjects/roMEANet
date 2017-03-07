(function() {
  'use strict';

  angular
    .module('articles')
    .directive('commentBlock', commentBlock);

  function commentBlock() {
    var directive = {
      scope: {
        article: '='
      },
      controllerAs: 'vm',
      controller: commentCtrl,
      templateUrl: '/modules/articles/client/views/comments.client.view.html'
    };

    return directive;

    function commentCtrl($scope, ArticlesService, CommentsService, $mdToast, $state, Authentication) {
      var vm = this;
      vm.editModel=[];
      vm.authentication = Authentication;
      vm.addComment = addComment;
      vm.submitComment = submitComment;
      vm.deleteComment = deleteComment;
      vm.editComment = editComment;
      vm.cancelEditComment = cancelEditComment;


      function submitComment(articleID, isValid) {

        console.log("[ctrl]saving comment");
        if (!isValid) {
          $scope.$broadcast('show-errors-check-validity', 'vm.form.articleForm');
          return false;
        }

        // Create a new article, or update the current instance
        vm.comment.createOrUpdate(articleID)
          .then(successCallback)
          .catch(errorCallback);

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
        // show comment input
        console.log(elem.parent("md-list").children("form"));
        elem.css("display", "none");
        elem.parent("md-list").children("form").css("display", "block");
        console.log(angular.element(document.getElementsByClassName('input-comment-box')));
        vm.comment = new CommentsService;
      }

      function deleteComment(commentID, articleID) {
        console.log("[ctrl]deleting comment...");
        console.log("articleId", articleID);
        console.log("commentId", commentID);
        var comment;

        // get comment
        CommentsService.get({
          articleId: articleID,
          commentId: commentID
        }).$promise.then(function(res) {
          console.log("promised");
          comment = res;
          console.log("comment", comment);
          // Create a new comment, or update the current instance
          comment.$remove({
            articleId: articleID,
            commentId: commentID
          }, function() {
            $state.reload();
            $mdToast.show($mdToast.simple().textContent('Comment deleted successfully!').position('top right').hideDelay(5000));
          }).catch(errorCallback);

        });

        function successCallback(res) {
          //  $state.reload(); // should we send the User to the list or the updated Article's view?
          $mdToast.show($mdToast.simple().textContent('Comment submitted successfully!').position('top right').hideDelay(5000));

        }

        function errorCallback(res) {
          $mdToast.show($mdToast.simple().textContent('Article save error ! ' + res.data.message).position('top right').hideDelay(5000));
        }
      }

      function editComment(commentID, articleID,index) {
        console.log("[ctrl]editing comment...");
        console.log("articleId", articleID);
        console.log("commentId", commentID);
        console.log("index",index);
        vm.editModel[index] = true;
        var comment;

        // get comment
        CommentsService.get({
          articleId: articleID,
          commentId: commentID
        }).$promise.then(function(res) {
          vm.comment = res;

          console.log("comment", comment);
          // Create a new comment, or update the current instance

        })
      }

      function cancelEditComment(index) {
        console.log("cancel edit");
        vm.comment = null;
        vm.editModel[index] = false;
      }
    }
  }
}());

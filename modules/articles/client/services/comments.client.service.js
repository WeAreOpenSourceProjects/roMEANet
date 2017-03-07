(function() {
  'use strict';

  angular
    .module('articles.services')
    .factory('CommentsService', CommentsService);

  CommentsService.$inject = ['$resource', '$log'];

  function CommentsService($resource, $log) {
    var Comment = $resource('/api/articles/:articleId/comments/:commentId', {
      commentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Comment.prototype, {
      createOrUpdate: function(articleID) {
        var comment = this;
        return createOrUpdate(comment,articleID);
      }
    });

    return Comment;

    function createOrUpdate(comment,articleID) {
      console.log("updating comment data..");
      console.log("comment is:", comment);
      if (comment._id) {
        console.log("i am update");
        return comment.$update({articleId: articleID},onSuccess, onError);
      } else {
        console.log("i am save");
        return comment.$save({articleId: articleID},onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(comment) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }


    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());

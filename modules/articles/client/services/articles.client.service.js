(function() {
  'use strict';

  angular
    .module('articles.services')
    .factory('ArticlesService', ArticlesService);

  ArticlesService.$inject = ['$resource', '$log'];

  function ArticlesService($resource, $log) {
    var Article = $resource('/api/articles/:articleId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Article.prototype, {
      createOrUpdate: function() {
        var article = this;
        return createOrUpdate(article);
      },
      deleteComment: function() {
        var comment = this;
        return deleteComment(comment);
      }
    });

    return Article;

    function createOrUpdate(article) {
      console.log("updating article data..");
      console.log("article is:", article);
      if (article._id) {
        return article.$update(onSuccess, onError);
      } else {
        return article.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(article) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function deleteComment(comment) {
      console.log("[service]deleting comment..");
      console.log("comment is:", comment);

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

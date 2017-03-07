'use strict';

/**
 * Module dependencies
 */
var articlesPolicy = require('../policies/articles.server.policy'),
  articles = require('../controllers/articles.server.controller'),
  comments = require('../controllers/comments.server.controller');

module.exports = function(app) {
  // Articles collection routes
  app.route('/api/articles').all(articlesPolicy.isAllowed)
    .get(articles.list)
    .post(articles.create);

  // Single article routes
  app.route('/api/articles/:articleId').all(articlesPolicy.isAllowed)
    .get(articles.read)
    .put(articles.update)
    .delete(articles.delete);
  // Comment collection routes
  app.route('/api/articles/:articleId/comments').all(articlesPolicy.isAllowed)
    .get(comments.list)
    .post(comments.create);
  // Single comment routes
  app.route('/api/articles/:articleId/comments/:commentId').all(articlesPolicy.isAllowed)
    .get(comments.read)
    .put(comments.update)
    .delete(comments.delete);

  // Finish by binding the article middleware
  app.param('articleId', articles.articleByID);
  app.param('commentId', comments.commentByID);
};

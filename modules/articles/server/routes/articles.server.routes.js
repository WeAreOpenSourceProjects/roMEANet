'use strict';

/**
 * Module dependencies
 */
var articlesPolicy = require('../policies/articles.server.policy'),
  articles = require('../controllers/articles.server.controller');

module.exports = function (app) {

  /**
   * @swagger
   * parameters:
   *   title:
   *     name: title
   *     description: title to use for article.
   *     in: formData
   *     required: true
   *     type: string
   *   content:
   *     name: content
   *     description: content to use for article.
   *     in: formData
   *     type: string
   *   path:
   *     name: path
   *     description: path to use for article.
   *     in: formData
   *     type: string
   *   user:
   *     name: user
   *     description: user to use for article.
   *     in: formData
   *     type: string
   *   created:
   *     name: created
   *     description: created to use for article.
   *     in: formData
   *     type: string
   *     format: date
   *
   */


  // Articles collection routes
  app.route('/api/articles').all(articlesPolicy.isAllowed)
    .get(articles.list)
    .post(articles.create);

  /**
   * @swagger
   * tags:
   *   name: Articles
   *   description: Articles management
   *
   * @swagger
   * /articles:
   *   get:
   *     description: Returns articles
   *     tags:
   *      - Articles
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: articles
   *
   * @swagger
   * /articles:
   *   post:
   *     description: Create articles
   *     tags:
   *      - Articles
   *     produces:
   *      - application/json
   *     parameters:
   *       - $ref: '#/parameters/title'
   *       - $ref: '#/parameters/content'
   *       - $ref: '#/parameters/user'
   *       - $ref: '#/parameters/created'
   *     responses:
   *       200:
   *         description: articles
   *         schema:
   *           type: object
   *           $ref: '#/definitions/Article'
   *
   */

  // Single article routes
  app.route('/api/articles/:articleId').all(articlesPolicy.isAllowed)
    .get(articles.read)
    .put(articles.update)
    .delete(articles.delete);

  /**
   * @swagger
   * /articles/{id}:
   *   get:
   *     description: update article
   *     tags:
   *      - Articles
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         description: number of items to skip
   *         required: true
   *         type: integer
   *         format: int32
   *     responses:
   *       200:
   *         description: articles
   *         schema:
   *           type: object
   *           $ref: '#/definitions/Article'
   *
   *   put:
   *     description: update article
   *     tags:
   *      - Articles
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         description: number of items to skip
   *         required: true
   *         type: integer
   *         format: int32
   *       - $ref: '#/parameters/title'
   *       - $ref: '#/parameters/content'
   *       - $ref: '#/parameters/user'
   *       - $ref: '#/parameters/created'
   *     responses:
   *       200:
   *         description: articles
   *         schema:
   *           type: object
   *           $ref: '#/definitions/Article'
   *   delete:
   *     description: delete article
   *     tags:
   *      - Articles
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         description: number of items to skip
   *         required: true
   *         type: integer
   *         format: int32
   *     responses:
   *       200:
   *         description: articles
   *
   */

  // Finish by binding the article middleware
  app.param('articleId', articles.articleByID);
};

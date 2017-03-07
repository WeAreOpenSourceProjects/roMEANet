'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  Comment = mongoose.model('Comment'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an comment
 */
exports.create = function(req, res) {
  console.log("creating comment..");
  var comment = new Comment(req.body);
  comment.user = req.user;
  var article = req.article;
  article.comments.push(comment);
  article.save(function(err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
  console.log("reading comment");
  // convert mongoose document to JSON
  console.log(req.params);
  console.log(req.article.comments.id(req.commentID));
  var comment = req.article.comments.id(req.commentID) ? req.article.comments.id(req.commentID).toJSON() : {};
  console.log("comment is:", comment);
  // Add a custom field to the comment, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the comment model.
  comment.isCurrentUserOwner = !!(req.user && comment.user && comment.user._id.toString() === req.user._id.toString());

  res.json(comment);
};

/**
 * Update an comment, in case that add comment
 */
exports.update = function(req, res) {
  console.log("updating comment");
  var article = req.article;
  article.comments.id(req.commentID).body = req.body.body;
  console.log("request body:",req.body);
  article.save(function(err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};


/**
 * Delete an article
 */
exports.delete = function(req, res) {
  console.log("deleting comment");
  var article = req.article;
  article.comments.id(req.commentID).remove(function(err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      article.save(function(err) {
        if (err) {
          return res.status(422).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.json(article);
        }
      });
    }
  });
};

/**
 * List of Articles
 */
exports.list = function(req, res) {
  Article.find().sort('-created').populate('user comments.user', 'displayName').exec(function(err, articles) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(articles);
    }
  });
};

/**
 * Comment middleware
 */
exports.commentByID = function(req, res, next, id) {
  console.log("finding comment");
  console.log("id", id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'comment is invalid'
    });
  }
  Article.findOne({
    "comments._id": id
  }).populate('comments.user', 'displayName').exec(function(err, article) {
    if (err) {
      return next(err);
    } else if (!article) {
      return res.status(404).send({
        message: 'No comment with that identifier has been found'
      });
    }
    req.article = article;
    req.commentID = id;
    next();
  });
};

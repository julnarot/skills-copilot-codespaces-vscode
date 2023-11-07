// Create web server
var express = require('express');
var router = express.Router();
var db = require('../models/db.js');

// GET /comments
router.get('/', function(req, res, next) {
  db.Comment.findAll({
    include: [db.Post]
  }).then(function(comments) {
    res.render('comments/index', {comments: comments});
  });
});

// GET /comments/new
router.get('/new', function(req, res, next) {
  db.Post.findAll().then(function(posts) {
    res.render('comments/new', {posts: posts});
  });
});

// POST /comments
router.post('/', function(req, res, next) {
  db.Comment.create(req.body).then(function(comment) {
    res.redirect('/comments/' + comment.id);
  });
});

// GET /comments/:id
router.get('/:id', function(req, res, next) {
  db.Comment.findById(req.params.id, {
    include: [db.Post]
  }).then(function(comment) {
    res.render('comments/show', {comment: comment});
  });
});

// GET /comments/:id/edit
router.get('/:id/edit', function(req, res, next) {
  db.Comment.findById(req.params.id).then(function(comment) {
    res.render('comments/edit', {comment: comment});
  });
});

// PUT /comments/:id
router.put('/:id', function(req, res, next) {
  db.Comment.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(function() {
    res.redirect('/comments/' + req.params.id);
  });
});

// DELETE /comments/:id
router.delete('/:id', function(req, res, next) {
  db.Comment.destroy({
    where: {
      id: req.params.id
    }
  }).then(function() {
    res.redirect('/comments');
  });
});

module.exports = router;
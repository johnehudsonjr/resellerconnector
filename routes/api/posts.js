const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')

// Post.js Model
const Post = require('../../models/Post')

// Profile.js Model
const Profile = require('../../models/Profile')


//  Validation
const validatePostInput = require('../../validation/post')

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public

router.get('/test', (req, res) => res.json({msg: "Posts Works"})
);

// @route   GET api/posts/
// @desc    Get all posts
// @access  Public

router.get('/', (req,res)=>{
   Post.find()
      .sort({date: -1})
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({nopostfound:'No posts found.'}))
});

// @route   GET api/posts/:id
// @desc    Get single post by id
// @access  Public

router.get('/:id', (req,res)=>{
   Post.findById(req.params.id)
      .then(post => res.json(post))
      .catch(err => res.status(404).json({nopostfound:'No post found with that id.'}))
});

// @route   GET api/posts/
// @desc    Create post
// @access  Private

router.post('/', passport.authenticate('jwt', {session:false}), (req,res)=>{

   const{errors, isValid} = validatePostInput(req.body);

   // check validation
   if(!isValid){
      // If there are errors, send 400 with errors object
      return res.status(400).json(errors);
   }

   const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
   })
   newPost.save().then(post => res.json(post));
})

// @route   DELETE api/posts/:id
// @desc   delete post
// @access  Private

router.delete('/:id', passport.authenticate('jwt', {session:false}), (req,res) =>{
   Profile.findOne({user: req.user.id})
   .then(profile => {
      Post.findById(req.params.id)
      .then(post =>{
         // check for post owner
         if (post.user.toString() != req.user.id){
            return res.status(401).json({notauthorized:'User not authorized'});
         }

         // Delete
         post.remove().then(() => res.json({success:true}));
      })
      .catch(err => res.status(404).json({postnotfound:"No post found"}))
   })
})


module.exports = router;
const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  // Implement logic to update a post
});

router.delete("/:id", withAuth, async (req, res) => {
  // Implement logic to delete a post
});

// Add other route handlers as needed

module.exports = router;

const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/withAuth");

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
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
        updatedAt: new Date(), 
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!updatedPost) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    console.log("Deleted post:", deletedPost);

    if (!deletedPost) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add other route handlers as needed

router.post("/:id/comments", withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: postId,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

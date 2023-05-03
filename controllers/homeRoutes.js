const router = require("express").Router();
const { Post, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User },
        {
          model: Comment,
          include: { model: User },
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    const post = postData.get({ plain: true });

    res.render("post", {
      ...post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/home");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/home");
    return;
  }
  res.render("signup");
});

// Add other route handlers as needed
router.get("/dashboard", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const postData = await Post.findAll({
        include: [{ model: User }],
      });

      const posts = postData.map((post) => post.get({ plain: true }));

      res.render("dashboard", {
        posts,
        loggedIn: req.session.loggedIn,
      });
      return;
    }
    res.render("homepage", {
      message: "Please log in or signup, it's free!",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/newPost", async (req, res) => {
  try {
    res.render("newpost", {
      loggedIn: req.session.loggedIn,
    });
    return;
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

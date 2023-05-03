const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const blogRoutes = require("./blogRoutes");

router.use("/", homeRoutes);
router.use("/", blogRoutes);
router.use("/api", apiRoutes);

module.exports = router;

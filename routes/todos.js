const router = require("express").Router();
const { index, show } = require("../controllers/todos.controller");

router.get("/", index);
router.get("/:id", show);

module.exports = router;

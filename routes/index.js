const { auth } = require("../middlewares/auth"); 
const router = require("express").Router();

router.use(require("./auth"));
router.use(auth);
router.use("/todos", require("./todos"));

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  createContent,
  getContents,
  getBySlug,
  updateContent,
  deleteContent
} = require("../../controller/admin/cms.controller");

router.post("/", createContent);
router.get("/", getContents);
router.get("/page/:slug", getBySlug);
router.put("/:id", updateContent);
router.delete("/:id", deleteContent);

module.exports = router;

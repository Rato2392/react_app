const express = require("express");
const router = express.Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const multer = require("multer");
const fs = require("fs");

//routes//

const upload = multer({
  dest: "./uploads/",
});
//create seq

router.post(
  "/new-seq",

  upload.single("file"),
  async (req, res) => {
    console.log(req.body, req.file);

    try {
      if (req.body.body == null) {
        return res.status(401).json("No study was selected");
      }

      const studyid = await pool.query(
        "SELECT study_id FROM sequences WHERE study_id = $1",
        [req.body.body]
      );
      if (studyid.rows.length !== 0) {
        return res.status(402).json("Study already have a sequence file");
      }

      const newSeq = await pool.query(
        "INSERT INTO sequences (study_id,filename, path) VALUES($1,$2,$3) RETURNING *",
        [req.body.body, req.file.originalname, req.file.path]
      );
      const seq = newSeq.rows[0];

      res.json(newSeq);
    } catch (err) {
      console.error(err.message);
    }
  }
);

//get seq

router.get("/users-seq", authorization, async (req, res) => {
  try {
    const userSeq = await pool.query(
      "SELECT users.users_id,study.study_id,sequences.seq_id,study.title,sequences.filename FROM ( users LEFT JOIN study ON users.users_id = study.users_id ) LEFT JOIN sequences ON study.study_id = sequences.study_id WHERE users.users_id = $1",
      [req.users]
    );

    res.json(userSeq.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;

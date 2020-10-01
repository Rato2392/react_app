const express = require("express");
const router = express.Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

//new metatada
router.post("/new-meta", async (req, res) => {
  console.log(req.body);
  try {
    const {
      study,
      primers,
      chem_seq,
      seq_platform,
      quality_seq,
      filter_criteria,
      origin_biome,
      lib_name,
      lib_strat,
      lib_src,
      lib_select,
    } = req.body;

    const newMeta = await pool.query(
      "INSERT INTO metadata (study_id,primers, chem_seq,seq_platform,quality_seq,filter_criteria,origin_biome,lib_name,lib_strat,lib_src,lib_select) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",
      [
        study.study_id,
        primers,
        chem_seq,
        seq_platform,
        quality_seq,
        filter_criteria,
        origin_biome,
        lib_name,
        lib_strat,
        lib_src,
        lib_select,
      ]
    );
    const meta = newMeta;

    res.json(meta);
  } catch (err) {
    console.error(err.message);
  }
});

//get metadata
router.get("/users-meta", authorization, async (req, res) => {
  try {
    const userMeta = await pool.query(
      "SELECT users.users_id,study.study_id,metadata.metadata_id FROM ( users LEFT JOIN study ON users.users_id = study.users_id ) LEFT JOIN metadata ON study.study_id = metadata.study_id WHERE users.users_id = $1",
      [req.users]
    );

    res.json(userMeta.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;

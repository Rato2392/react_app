const express = require("express");
const router = express.Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
//routes//

//create study, user needs to be logged in

router.post("/new-study", authorization, async (req, res) => {
  try {
    //get study params from the body
    const { title, description, pubmed_id, DOI } = req.body;
    // check if theres a study with same title for that user
    const titlexist = await pool.query(
      "SELECT title FROM study WHERE title = $1 AND users_id = $2",
      [title, req.users]
    );
    if (titlexist.rows.length !== 0) {
      return res.status(401).json("Study already exist");
    }
    //if everything is okay, study information is inserted in study table in the database
    const newStudy = await pool.query(
      "INSERT INTO study (users_id,title, description,pubmed_id,DOI) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [req.users, title, description, pubmed_id, DOI]
    );
    const study = newStudy.rows[0];
    //after the study is submited in the database, the information is sent back to the front-end
    res.json(study);
  } catch (err) {
    console.error(err.message);
  }
});

//get all studies from the table studies

router.get("/study", async (req, res) => {
  try {
    const allStudy = await pool.query("SELECT * FROM study");
    res.json(allStudy.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get user studies, user needs to be logged in

router.get("/user-study", authorization, async (req, res) => {
  try {
    //route gets the user logged information, and uses a left join to obtain all information from study table using the user id
    const userStudy = await pool.query(
      "SELECT study.study_id,study.title,study.description,study.pubmed_id,study.doi FROM users LEFT JOIN study ON users.users_id = study.users_id WHERE users.users_id = $1",
      [req.users]
    );

    res.json(userStudy.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//update a study, user needs to be logged in

router.put("/study/:study_id", authorization, async (req, res) => {
  try {
    //route gets user logged information and the new fields as body
    const { study_id } = req.params;
    const { title, description, pubmed_id, doi } = req.body;
    //study gets updated on the database with the new information
    const updateStudy = await pool.query(
      "Update study SET title = $1 ,description = $2,pubmed_id = $3,doi = $4 WHERE study_id = $5 AND users_id = $6 RETURNING *",
      [title, description, pubmed_id, doi, study_id, req.users]
    );
    //in case someone tries to force them selfs inside other people studyies
    if (updateStudy.rows.length === 0) {
      return res.json("This study is not yours");
    }
    res.json("Study was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a study, user needs to be logged in

router.delete("/study/:study_id", authorization, async (req, res) => {
  try {
    //route gets user logged information and the study id to be eleminated
    const { study_id } = req.params;
    //the study is deleted from the database
    const deleteStudy = await pool.query(
      "DELETE FROM study WHERE study_id = $1 AND users_id = $2 RETURNING *",
      [study_id, req.users]
    );
    //in case someone tries to force them selfs inside other people studyies
    if (deleteStudy.rows.length === 0) {
      return res.json("This study is not yours");
    }
    //response to front-end
    res.json("Study was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;

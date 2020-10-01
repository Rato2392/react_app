//import packages
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const multer = require("multer");

const users = require("./Routes/users_route");
const study = require("./Routes/study_route");
const seq = require("./Routes/seq_route");
const meta = require("./Routes/metadata_route");

//start app

const app = express();

//middleware
app.use(cors());
app.use(express.json()); //req.body ( data coming from user side)
app.use(express.urlencoded({ extended: true }));

//user login and creation route//

app.use("/", users);

//study routes
app.use("/", study);

//sequences routes
app.use("/", seq);

//metadata routes
app.use("/", meta);

app.listen(5000, () => {
  console.log(`server has started on 5000`);
});

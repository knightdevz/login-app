require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.get("/getOrganizes", async (req, res) => {
  try {
    const token = req.query.token;
    const API_URL = "http://125.26.15.143:15668";
    const data = axios.get(
      `${API_URL}/organizations?pagesize=20&page=1&sortcol=id&sortorder=desc`,
      {
        headers: {
          Cookie: `access_token=${token}`,
        },
      }
    ).then(response => {
        const data = response.data.data;
        res.status(200).json({ status: "success", data });
    });
   
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

const port = process.env.NODE_DOCKER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

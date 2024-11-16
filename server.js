const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let sensorData = {
  temperature: 0,
  ph: 0,
  oxygen: 0,
  turbidity: 0,
};

app.post("/data", (req, res) => {
  sensorData = req.body;
  console.log("Data received:", sensorData);
  res.send("Data received");
});

app.get("/data", (req, res) => {
  res.json(sensorData);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


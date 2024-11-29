const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use("/api/inventory", require("./routes/inventoryRoute"));
app.use("/api/chat", require("./routes/inventoryRoute"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

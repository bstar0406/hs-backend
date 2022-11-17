const express = require("express");
const compression = require('compression')
const connectDB = require("./config/db");
const cors = require("cors");
const uploadFile = require("./middleware/upload")

const app = express();

global.__baseurl = __dirname;
// // Connect to MongoDB
connectDB();

// Initialize middleware
app.use(compression());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }))
app.use(uploadFile);
app.use(
  cors()
);

// Routes
app.use("/api/seekers", require("./routes/api/seekers"));
app.use("/api/company", require("./routes/api/company"));
app.use("/api/signin", require("./routes/api/signin"));
app.use("/api/contract", require("./routes/api/contract"));
app.use(express.static("./resources/assets"));
// Serve static assets in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("resource/assets"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

const port = process.env.PORT || 5100;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

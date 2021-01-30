const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoute = require("./routes/Auth.routes");
const jobRoute = require("./routes/Job.routes");
const userRoute = require("./routes/User.routes");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/Error.middleware");

// load config
dotenv.config();
// app connection
const app = express();

// db connection
connectDB();
// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// enables cors
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

// routes
app.get("/", (req, res) => {
  res.status(200).send({ status: "okay" });
});
// app.use("/api/project", projectRoute);
app.use("/api/user", authRoute);
app.use("/api/job", jobRoute);
app.use("/api/user", userRoute);
app.use(notFound);
app.use(errorHandler);

// Port config
const PORT = process.env.PORT || 5555;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
  }
});

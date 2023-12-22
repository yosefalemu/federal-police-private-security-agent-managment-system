require("dotenv").config();
require("express-async-errors");
// express

const express = require("express");
const app = express();
// rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

// database
const connectDB = require("./database/connect");

//  routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const employeeRouter = require("./routes/employeesRoute");
const agentRouter = require("./routes/securityAgentRoutes");
const documentRouter = require("./routes/documentRoutes");

// middleware
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

// Add this middleware to your Express app
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(cors(corsOptions));
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/publicfolder", express.static(__dirname + "/public"));
app.use(fileUpload());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/employees", employeeRouter);
app.use("/api/v1/agents", agentRouter);
app.use("/api/v1/documents", documentRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

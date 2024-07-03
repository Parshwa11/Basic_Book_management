const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./DB/dbConnection");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const Port = process.env.PORT;

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());


connectDB()
  .then(() => {
    app.listen(Port, () => {
      console.log(`App is Listning on Port ${Port} `);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res, next) => {
  res.send("main file called");
});

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.get("/a", (req, res, next) => {
  try {
    aconsole.log("Hello error");
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
    stack: err.stack,
  });
});

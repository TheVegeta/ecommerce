process.env.NODE_ENV !== "production" && require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");
const cors = require("cors");

const { productRoute } = require("./routes/product");
const { userRoute } = require("./routes/user");
const { paymentRoute } = require("./routes/payment");
const { adminRoutes } = require("./routes/admin");

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGOURI || "mongodb://localhost:27017/ecommerce";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize({ replaceWith: "_" }));

process.env.NODE_ENV !== "production" && app.use(cors());

app.use("/api/product", productRoute);
app.use("/api/user", userRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/admin", adminRoutes);

app.use(express.static(path.join(__dirname, "build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use((err, req, res, next) => {
  res.status(500).json({ success: false, msg: "somthing went wrong" });
});

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(port, () => console.log(`app is running at port ${port}`))
  )
  .catch((err) => console.log(err.message));

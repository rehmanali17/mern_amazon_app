const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || config.get("PORT");

app.use(express.json({ extended: true, limit: "5mb" }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public/build")));

mongoose
    .connect(config.get("mongoURi"), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database Connected");
        app.listen(PORT, () => console.log(`Server Running at PORT ${PORT}`));
    })
    .catch((err) => {
        console.log(err.message);
        process.exit(1);
    });

app.use("/api/auth", require("./routes/auth/auth-routes"));
app.use("/api/customer", require("./routes/customer/customer-routes"));
app.use("/api/seller", require("./routes/seller-account/seller-account"));
app.use("/api/currency", require("./routes/currency/currency"));
app.use("/api/sales", require("./routes/sales/sales"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/build/index.html"));
});

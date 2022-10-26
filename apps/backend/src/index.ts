import "dotenv/config";
import express from "express";

const app = express();

app.use("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
	console.log(`Server started on port http://localhost:${process.env.PORT}`);
});

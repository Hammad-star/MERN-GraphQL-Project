import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";
import colors from "colors";
import connectDB from "./config/db.js";
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// Connect to MongoDB
connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development", //set to ture if environment  is development and not production
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

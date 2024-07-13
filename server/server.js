import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import connect from "./database/conn.js";
import router from "./router/route.js";
import eventRoutes from "./router/eventRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

/* middleware */
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({
  origin: ['https://event-app-sand-eta.vercel.app', 'https://event-backend-one.vercel.app'], // Add your frontend URL here
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(morgan("tiny"));
app.disable("x-powered-by"); // less hackers know about our stack

const port = process.env.PORT;
// console.log("Post is :", port);

// HTTP GET Request
app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});

// api route
app.use("/api", router);
app.use("/api/events", eventRoutes);

// start server when have valid connection
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server Connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection...!", error);
  });

export default app;

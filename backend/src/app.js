import express from "express";
import cors from "cors";

import readmeRoutes from "./routes/readmeRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(express.json({ limit: "16kb" }));

app.use("/api", readmeRoutes);

export { app };

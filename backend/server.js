import "./src/config/dns.js";
import "dotenv/config";
import express from "express";
import connect_db from "./src/config/db.js";
import userRoutes from "./src/routes/user.routes.js";
import jobRoutes from "./src/routes/job.routes.js";
import cors from "cors";
import protect from "./src/middleware/auth.js";
connect_db();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/job",protect, jobRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

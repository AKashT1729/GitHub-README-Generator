import dotenv from "dotenv";

import { app } from "../src/app.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
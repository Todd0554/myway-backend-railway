import path from 'path'
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import helmet from "helmet";
import cors from "cors";
// middleware for handling error
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
// routes
import siteRoutes from "./routes/siteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();

// app.use(function (req, res, next) {
//   res.setHeader(
//     'Content-Security-Policy-Report-Only',
//     "default-src 'self' https://ka-f.fontawesome.com; font-src 'self' https://ka-f.fontawesome.com; img-src 'self' https://images.unsplash.com https://maps.gstatic.com; script-src 'self' https://kit.fontawesome.com/56a258cb08.js https://maps.googleapis.com; style-src 'self' https://fonts.googleapis.com/; frame-src 'self'"
//   );
//   next();
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/sites", siteRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use('/api/upload', uploadRoutes)
// upload folder used as static files folder 
const __dirname = path.resolve()
app.use('/upload', express.static(path.join(__dirname, '/upload')))






app.use(notFound);
app.use(errorHandler);

export default app

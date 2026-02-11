require("dotenv").config();
// semgrep: ignore javascript.express.security.audit.express-check-csurf-middleware-usage
const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
// semgrep: ignore javascript.express.security.audit.express-check-csurf-middleware-usage
const app = express();

app.use(cors());
//app.use(express.json());

// Health check (DevSecOps)
app.get("/health", (_req, res) => {
  res.json({ status: "api-gateway OK" });
});

// AUTH → users-service
app.use(
  "/auth",
  createProxyMiddleware({
    target: "http://users-service:3001",
    changeOrigin: true,
  })
);

// COURSES → academic-service
app.use(
  "/courses",
  createProxyMiddleware({
    target: "http://academic-service:3002",
    changeOrigin: true,
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 API Gateway running on port ${PORT}`);
});
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import apiApp from "./src/server/apiApp";

const PORT = 3000;

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    apiApp.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    apiApp.use(express.static(distPath));
    apiApp.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  apiApp.listen(PORT, "0.0.0.0", () => {
    console.log(`VIETNAM'S TRAVEL server running on http://localhost:${PORT}`);
  });
}

startServer();

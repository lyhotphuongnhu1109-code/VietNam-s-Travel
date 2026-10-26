import apiApp from "../src/server/apiApp";

// Vercel Serverless Function entry point
export default function handler(req: any, res: any) {
  return apiApp(req, res);
}

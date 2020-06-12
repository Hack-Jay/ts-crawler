import { Router, Request, Response } from "express";
import Crowller from './crowller'
import ZAnalyzer from "./zAnalyzer";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.end("express splider.");
});

router.get("/get-data", (req: Request, res: Response) => {
  const secret = "secretKey";
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
  const zAnalyzer = ZAnalyzer.getInstance();

  const crowller = new Crowller(url, zAnalyzer);
  res.end("express get data.");
});

export default router;

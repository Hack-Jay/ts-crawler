import fs from "fs";
import cheerio from "cheerio";
import { Analyzer } from './crowller'

interface Course {
  title: string;
  count: number;
}

interface CourseResult {
  time: number;
  data: Course[];
}

interface Content {
  [propName: number]: Course[];
}

export default class BAnalyzer implements Analyzer {
  analyze(html: string, filePath: string) {
    return JSON.stringify(html)
  }
}

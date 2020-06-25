import fs from "fs";
import cheerio from "cheerio";
import { Analyzer } from "./crowller";

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

export default class ZAnalyzer implements Analyzer {
  private static instance: ZAnalyzer;
  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new ZAnalyzer();
    }
    return this.instance;
  }

  public analyze(html: string, filePath: string) {
    const courseInfo = this.getCourseInfo(html);
    const fileContent = this.generatorJson(courseInfo, filePath);
    return JSON.stringify(fileContent);
  }

  private getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItem = $(".course-item");
    const courseArr: Course[] = [];
    courseItem.map((index, element) => {
      const desc = $(element).find(".course-desc");
      const title = desc.eq(0).text();
      const count = parseInt(desc.eq(1).text().split("：")[1], 10) || 0;
      courseArr.push({ title, count });
    });
    const result = {
      time: new Date().getTime(),
      data: courseArr,
    };
    return result;
  }


  private generateJsonContent(courseInfo: CourseResult, filePath: string) {
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }

  private generatorJson(result: CourseResult, filePath: string) {
    let filePathContent: Content = {};
    if (fs.existsSync(filePath)) {
      filePathContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    filePathContent[result.time] = result.data;
    return filePathContent;
  }
}

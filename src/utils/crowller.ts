import fs from "fs";
import path from "path";
import superagent from "superagent";

export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

export default class Crowller {
  private filePath = path.resolve(__dirname, "../../data/course.json");

  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess();
  }

  private async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.analyze(html, this.filePath);
    this.wirteFile(fileContent);
  }

  private async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  private wirteFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }
}

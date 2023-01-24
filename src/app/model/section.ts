import {Icon} from "./Icon";

export class Section {
  active: number
  description: string
  icons: Icon[];
  sectionId: number
  sectionName: string;
  items: any = [];


  constructor(active: number, description: string, icons: Icon[], sectionId: number, sectionName: string, items: any) {
    this.active = active;
    this.description = description;
    this.icons = icons;
    this.sectionId = sectionId;
    this.sectionName = sectionName;
    this.items = items;
  }
}

import { Measurements } from "./Measurements";

export class Ingredients {
  // id: string;
  quantity: string;
  measurement?: Measurements;
  description: string;

  constructor(props?: Partial<Ingredients>) {
    props = props || {};
    Object.assign(this, props);
  }
}

import { Ingredients } from "./Ingredients";

export class Recipe {
  id: string;
  imgUrl: string;
  description: string;
  //legacy string until db updated
  Ingredients: (Ingredients | string)[];
  Method: string[];
  tags: string[];

  constructor(props?: Partial<Recipe>) {
    props = props || {};
    Object.assign(this, props);
  }
}

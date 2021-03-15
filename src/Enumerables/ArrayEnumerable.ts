import { List } from "../Collections";
import { IList } from "../types";
import { Enumerable } from "./Enumerable";

export class ArrayEnumerable<TOut> extends Enumerable<TOut>{
  protected list: IList<TOut>;
  public constructor(source: TOut[]) {
    super(source);
    this.list = new List(source)
  }
}
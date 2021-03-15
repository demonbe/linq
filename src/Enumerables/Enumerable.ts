import { IIterable, ICached } from "../types";
import { Cached } from "../Utils";
import { EnumerableBase } from "./EnumerableBase";

export class Enumerable<TElement> extends EnumerableBase<TElement, TElement>{
  protected currentValue: ICached<TElement>;
  public constructor(source: IIterable<TElement>) {
    super(source);
    this.currentValue = new Cached<TElement>();
  }

  public value(): TElement {
    if (!this.currentValue.isValid()) {
      this.currentValue.value = this.source.value();
    }

    return this.currentValue.value;
  }
}
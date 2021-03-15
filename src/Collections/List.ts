import { IList, IReadOnlyList } from "../types";
import { ArrayQueryable } from "./ArrayQueryable";

export class List<TElement> extends ArrayQueryable<TElement> implements IList<TElement>{
  public copy(): IList<TElement> {
    return new List<TElement>(this.toArray());
  }

  public asReadOnly(): IReadOnlyList<TElement> {
    return this;
  }

  public clear(): void {
    this.source = [];
  }

  public remove(element: TElement): void {
    this.source = this.source.filter(item => item !== element);
  }

  public removeAt(index: number): TElement | undefined {
    if (index < 0 || this.source[index] === undefined) {
      throw new Error('Out of bounds');
    }

    return this.source.splice(index, 1)[0];
  }

  public get(index: number): TElement | undefined {
    return this.source[index];
  }

  public push(element: TElement): number {
    return this.source.push(element);
  }
}
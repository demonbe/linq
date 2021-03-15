import { IEnumerable, IList } from "../types";
import { ArrayEnumerable } from "../Enumerables";
import { EnumerableCollection, List } from ".";

export abstract class ArrayQueryable<TElement> extends EnumerableCollection<TElement>{
  protected source: TElement[];

  constructor();
  constructor(elements: TElement[]);
  constructor(elements: TElement[] = []) {
    super();
    this.source = elements;
  }

  public asArray(): TElement[] {
    return this.source;
  }

  public toArray(): TElement[] {
    return [].concat(this.source);
  }

  public toList(): IList<TElement> {
    return new List<TElement>(this.toArray());
  }

  public asEnumerable(): IEnumerable<TElement> {
    return new ArrayEnumerable<TElement>(this.source);
  }
}
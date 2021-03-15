import { Aggregator, IEnumerable, IGrouping, IList, Indexer, IQueryable, Predicate, Selector } from "../types";
import { ArrayEnumerable } from "../Enumerables";
import { EnumerableCollection, List, Dictionary } from ".";

export abstract class ArrayQueryable<TElement> extends EnumerableCollection<TElement>{
  protected source: TElement[];

  constructor();
  constructor(elements: TElement[]);
  constructor(elements: TElement[] = []) {
    super();
    this.source = elements;
  }

  public abstract copy(): IQueryable<TElement>;

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

  public aggregate(aggregator: Aggregator<TElement, TElement | undefined>): TElement;
  public aggregate<TValue>(aggregator: Aggregator<TElement, TValue>, initialValue: TValue): TValue;
  public aggregate<TValue>(aggregator: Aggregator<TElement, TValue | TElement | undefined>, initialValue?: TValue): TValue | TElement {
    if (initialValue !== undefined) {
      return this.source.reduce(aggregator as Aggregator<TElement, TElement | TValue>, initialValue);
    }

    return this.source.reduce(aggregator as Aggregator<TElement, TElement | undefined>);
  }

  public any(): boolean;
  public any(predicate: Predicate<TElement>): boolean;
  public any(predicate?: Predicate<TElement>): boolean {
    if (predicate !== undefined) {
      return this.source.some(predicate);
    }

    return this.source.length > 0;
  }

  public all(predicate: Predicate<TElement>): boolean {
    return this.source.some(predicate);
  }

  public average(selector: Selector<TElement, number>): number {
    if (this.count() === 0) {
      throw new Error("Sequence contains no elements");
    }

    let sum = 0;

    for (let i = 0, end = this.source.length; i < end; ++i) {
      sum += selector(this.source[i]);
    }

    return sum / this.source.length;
  }

  public count(): number;
  public count(predicate: Predicate<TElement>): number;
  public count(predicate?: Predicate<TElement>): number {
    if (predicate !== undefined) {
      return this.source.filter(predicate).length;
    }

    return this.source.length;
  }

  public elementAtOrDefault(index: number): TElement | undefined {
    if (index < 0) {
      throw new Error("Negative index is forbiden");
    }

    return this.source[index];
  }

  public firstOrDefault(): TElement | undefined;
  public firstOrDefault(predicate: Predicate<TElement>): TElement | undefined;
  public firstOrDefault(predicate?: Predicate<TElement>): TElement | undefined {
    if (predicate !== undefined) {
      return this.source.filter(predicate)[0];
    }

    return this.source[0];
  }

  public groupBy<TKey extends Indexer>(keySelector: Selector<TElement, TKey>): IEnumerable<IGrouping<TKey, TElement>>;
  public groupBy<TKey extends Indexer, TValue>(keySelector: Selector<TElement, TKey>, valueSelector: Selector<TElement, TValue>): IEnumerable<IGrouping<TKey, TValue>>;
  public groupBy<TKey extends Indexer, TValue>(keySelector: Selector<TElement, TKey>, valueSelector?: Selector<TElement, TValue>): IEnumerable<IGrouping<TKey, TElement | TValue>> {
    const array = this.asArray();
    const dictionary = new Dictionary<TKey, IQueryable<TElement | TValue>>();

    for (let i = 0; i < array.length; ++i) {
      const key = keySelector(array[i]);
      const value = valueSelector !== undefined
        ? valueSelector(array[i])
        : array[i];

      if (!dictionary.containsKey(key)) {
        dictionary.set(key, new List<TElement | TValue>());
      }

      (dictionary.get(key) as IList<TElement | TValue>).push(value);
    }

    return dictionary.asEnumerable();
  }

  public *[Symbol.iterator](): IterableIterator<TElement> {
    for (let i = 0; i < this.source.length; i++) {
      yield this.source[i];
    }
  }
}
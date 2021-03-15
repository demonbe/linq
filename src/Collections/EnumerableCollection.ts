import { List, Dictionary } from ".";
import { UniqueEnumerable } from "../Enumerables/UniqueEnumerable";
import { IQueryable, IList, Selector, Aggregator, Indexer, IDictionary, Predicate, IEnumerable, Action } from "../types";

export abstract class EnumerableCollection<TElement> implements IQueryable<TElement>{
  public abstract copy(): IQueryable<TElement>;
  public abstract asEnumerable(): IEnumerable<TElement>;
  public abstract toArray(): TElement[];

  toList(): IList<TElement> {
    return new List<TElement>(this.toArray());
  }

  toDictionary<TKey extends Indexer, TValue>(keySelector: Selector<TElement, TKey>, valueSelector: Selector<TElement, TValue>): IDictionary<TKey, TValue> {
    return Dictionary.fromArray(this.toArray(), keySelector, valueSelector);
  }

  aggregate(aggregator: Aggregator<TElement, TElement | undefined>): TElement;
  aggregate<TValue>(aggregator: Aggregator<TElement, TValue>, initialValue: TValue): TValue;
  aggregate<TValue>(aggregator: Aggregator<TElement, TValue | TElement | undefined>, initialValue?: TValue): TElement | TValue {
    if (initialValue !== undefined) {
      return this.asEnumerable().aggregate(aggregator as Aggregator<TElement, TValue>, initialValue);
    }

    return this.asEnumerable().aggregate(aggregator as Aggregator<TElement, TElement | undefined>);
  }

  all(predicate: Predicate<TElement>): boolean {
    return this.asEnumerable().all(predicate);
  }

  any(): boolean;
  any(predicate: Predicate<TElement>): boolean;
  any(predicate?: Predicate<TElement>) {
    if (predicate !== undefined) {
      return this.asEnumerable().any(predicate);
    }

    return this.asEnumerable().any();
  }

  average(selector: Selector<TElement, number>): number {
    return this.asEnumerable().average(selector);
  }

  concat(other: IQueryable<TElement> | TElement[], ...others: (IQueryable<TElement> | TElement[])[]): IEnumerable<TElement> {
    return this.asEnumerable().concat(other, ...others);
  }

  contains(element: TElement): boolean {
    return this.any(e => e === element);
  }

  count(): number;
  count(predicate: Predicate<TElement>): number;
  count(predicate?: Predicate<TElement>): number {
    if (predicate !== undefined) {
      return this.asEnumerable().count(predicate);
    }

    return this.asEnumerable().count();
  }

  defaultIfEmpty(): IEnumerable<TElement>;
  defaultIfEmpty(defaultValue: TElement): IEnumerable<TElement>;
  defaultIfEmpty(defaultValue?: TElement): IEnumerable<TElement> {
    if (defaultValue !== undefined) {
      return this.asEnumerable().defaultIfEmpty(defaultValue);
    }

    return this.asEnumerable().defaultIfEmpty();
  }

  distinct(): IEnumerable<TElement>;
  distinct<TKey>(keySelector: Selector<TElement, TKey>): IEnumerable<TElement>;
  distinct<TKey>(keySelector?: Selector<TElement, TKey>): IEnumerable<TElement> {
    return new UniqueEnumerable(this.asEnumerable(), keySelector);
  }

  elementAt(index: number): TElement {
    const element = this.elementAtOrDefault(index);

    if (element === undefined) {
      throw new Error("Out of bounds");
    }

    return element;
  }

  elementAtOrDefault(index: number): TElement {
    return this.asEnumerable().elementAtOrDefault(index);
  }

  except(other: IQueryable<TElement>): IEnumerable<TElement> {
    return this.asEnumerable().except(other);
  }

  first(): TElement;
  first(predicate: Predicate<TElement>): TElement;
  first(predicate?: Predicate<TElement>): TElement {
    let element: TElement | undefined;

    if (predicate !== undefined) {
      element = this.firstOrDefault(predicate);
    }
    else {
      element = this.firstOrDefault();
    }

    if (element === undefined) {
      throw new Error("Sequence contains no elements");
    }

    return element;
  }

  firstOrDefault(): TElement;
  firstOrDefault(predicate: Predicate<TElement>): TElement;
  firstOrDefault(predicate?: Predicate<TElement>): TElement {
    if (predicate !== undefined) {
      return this.asEnumerable().firstOrDefault(predicate);
    }

    return this.asEnumerable().firstOrDefault();
  }

  forEach(action: Action<TElement>): void {
    return this.asEnumerable().forEach(action);
  }

  groupBy<TKey extends Indexer>(keySelector: Selector<TElement, TKey>): IEnumerable<IGrouping<TKey, TElement>>;
  groupBy<TKey extends Indexer, TValue>(keySelector: Selector<TElement, TKey>, valueSelector: Selector<TElement, TValue>): IEnumerable<IGrouping<TKey, TValue>>;
  groupBy<TKey extends Indexer, TValue>(keySelector: Selector<TElement, TKey>, valueSelector?: Selector<TElement, TValue>): IEnumerable<IGrouping<TKey, TValue>> {
    const array = this.toArray();
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

  last(): TElement;
  last(predicate: Predicate<TElement>): TElement;
  last(predicate?: Predicate<TElement>): TElement {
    let element: TElement | undefined;

    if (predicate !== undefined) {
      element = this.lastOrDefault(predicate);
    }
    else {
      element = this.lastOrDefault();
    }

    if (element === undefined) {
      throw new Error("Sequence contains no elements");
    }

    return element;
  }

  lastOrDefault(): TElement;
  lastOrDefault(predicate: Predicate<TElement>): TElement;
  lastOrDefault(predicate?: Predicate<TElement>): TElement {
    if (predicate !== undefined) {
      return this.asEnumerable().lastOrDefault(predicate);
    }

    return this.asEnumerable().lastOrDefault();
  }

  max(): TElement;
  max<TSelectorOut>(selector: Selector<TElement, TSelectorOut>): TSelectorOut;
  max<TSelectorOut>(selector?: Selector<TElement, TSelectorOut>): TSelectorOut {
    
  }

  min(): TElement;
  min<TSelectorOut>(selector: Selector<TElement, TSelectorOut>): TSelectorOut;
  min(selector?: any) {
    throw new Error("Method not implemented.");
  }
  orderBy<TKey>(keySelector: Selector<TElement, TKey>): IOrderedEnumerable<TElement>;
  orderBy<TKey>(keySelector: Selector<TElement, TKey>, comparer: Comparer<TKey>): IOrderedEnumerable<TElement>;
  orderBy(keySelector: any, comparer?: any) {
    throw new Error("Method not implemented.");
  }
  orderByDescending<TKey>(keySelector: Selector<TElement, TKey>): IOrderedEnumerable<TElement> {
    throw new Error("Method not implemented.");
  }
  reverse(): IEnumerable<TElement> {
    throw new Error("Method not implemented.");
  }
  select<TSelectorOut>(selector: Selector<TElement, TSelectorOut>): IEnumerable<TSelectorOut> {
    throw new Error("Method not implemented.");
  }
  selectMany<TSelectorOut>(selector: Selector<TElement, TSelectorOut[] | IQueryable<TSelectorOut>>): IEnumerable<TSelectorOut> {
    throw new Error("Method not implemented.");
  }
  sequenceEqual(other: IQueryable<TElement> | TElement[]): boolean;
  sequenceEqual(other: IQueryable<TElement> | TElement[], comparer: EqualityComparer<TElement>): boolean;
  sequenceEqual(other: any, comparer?: any) {
    throw new Error("Method not implemented.");
  }
  single(): TElement;
  single(predicate: Predicate<TElement>): TElement;
  single(predicate?: any) {
    throw new Error("Method not implemented.");
  }
  singleOrDefault(): TElement;
  singleOrDefault(predicate: Predicate<TElement>): TElement;
  singleOrDefault(predicate?: any) {
    throw new Error("Method not implemented.");
  }
  skip(amount: number): IEnumerable<TElement> {
    throw new Error("Method not implemented.");
  }
  skipWhile(predicate: Predicate<TElement>): IEnumerable<TElement> {
    throw new Error("Method not implemented.");
  }
  sum(selector: Selector<TElement, number>): number {
    throw new Error("Method not implemented.");
  }
  take(amount: number): IEnumerable<TElement> {
    throw new Error("Method not implemented.");
  }
  takeWhile(predicate: Predicate<TElement>): IEnumerable<TElement> {
    throw new Error("Method not implemented.");
  }
  union(other: IQueryable<TElement>): IEnumerable<TElement> {
    throw new Error("Method not implemented.");
  }
  where(predicate: Predicate<TElement>): IEnumerable<TElement> {
    throw new Error("Method not implemented.");
  }
  zip<TOther, TSelectorOut>(other: IQueryable<TOther> | TOther[], selector: ZipSelector<TElement, TOther, TSelectorOut>): IEnumerable<TSelectorOut> {
    throw new Error("Method not implemented.");
  }

}
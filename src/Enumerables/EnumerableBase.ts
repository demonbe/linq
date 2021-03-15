import { Dictionary, List } from "../Collections";
import { Aggregator, IDictionary, IEnumerable, IIterable, Indexer, Predicate, Selector } from "../types";

export abstract class EnumerableBase<TElement, TOut> implements IEnumerable<TOut>{
  protected readonly source: IIterable<TElement> | IEnumerable<TElement>;

  protected constructor(source: IIterable<TElement>) {
    this.source = source;
  }

  public abstract copy(): IEnumerable<TOut>;
  public abstract value(): TOut;

  asEnumerable(): IEnumerable<TOut> {
    return this;
  }

  toArray(): TOut[] {
    const result: TOut[] = [];
    this.reset();

    while (this.next()) {
      result.push(this.value());
    }

    return result;
  }

  toList(): Linq.IList<TOut> {
    return new List<TOut>(this.toArray());
  }

  toDictionary<TKey extends Indexer, TValue>(keySelector: Selector<TOut, TKey>, valueSelector: Selector<TOut, TValue>): IDictionary<TKey, TValue> {
    return Dictionary.fromArray(this.toArray(), keySelector, valueSelector);
  }

  aggregate(aggregator: Aggregator<TOut, TOut>): TOut;
  aggregate<TValue>(aggregator: Aggregator<TOut, TValue>, initialValue: TValue): TValue;
  aggregate<TValue>(aggregator?: Aggregator<TOut, TValue>, initialValue?: TValue): TValue {
    let value = initialValue;
    this.reset();

    if (initialValue === undefined) {
      if (!this.next()) {
        throw new Error("Sequence contains no elements");
      }

      value = aggregator(value as TValue, this.value());
    }

    while (this.next()) {
      value = aggregator(value as TValue, this.value());
    }

    return value as TValue;
  }

  all(predicate: Predicate<TOut>): boolean {
    this.reset();
    while (this.next()) {
      if (!predicate(this.value())) {
        return false;
      }
    }

    return true;
  }

  any(): boolean;
  any(predicate: Predicate<TOut>): boolean;
  any(predicate?: Predicate<TOut>): boolean {
    if (predicate !== undefined) {
      return new ConditionalEnumerable<TOut>(this, predicate).any();
    }

    this.reset();
    return this.next();
  }

  average(selector: Linq.Selector<TOut, number>): number {
    throw new Error("Method not implemented.");
  }
  concat(other: Linq.IQueryable<TOut> | TOut[], ...others: (Linq.IQueryable<TOut> | TOut[])[]): IEnumerable<TOut> {
    throw new Error("Method not implemented.");
  }
  contains(element: TOut): boolean {
    throw new Error("Method not implemented.");
  }
  count(): number;
  count(predicate: Linq.Predicate<TOut>): number;
  count(predicate?: any) {
    throw new Error("Method not implemented.");
  }
  defaultIfEmpty(): IEnumerable<TOut>;
  defaultIfEmpty(defaultValue: TOut): IEnumerable<TOut>;
  defaultIfEmpty(defaultValue?: any) {
    throw new Error("Method not implemented.");
  }
  distinct(): IEnumerable<TOut>;
  distinct<TKey>(keySelector: Linq.Selector<TOut, TKey>): IEnumerable<TOut>;
  distinct(keySelector?: any) {
    throw new Error("Method not implemented.");
  }
  elementAt(index: number): TOut {
    throw new Error("Method not implemented.");
  }
  elementAtOrDefault(index: number): TOut {
    throw new Error("Method not implemented.");
  }
  except(other: Linq.IQueryable<TOut>): IEnumerable<TOut> {
    throw new Error("Method not implemented.");
  }
  first(): TOut;
  first(predicate: Linq.Predicate<TOut>): TOut;
  first(predicate?: any) {
    throw new Error("Method not implemented.");
  }
  firstOrDefault(): TOut;
  firstOrDefault(predicate: Linq.Predicate<TOut>): TOut;
  firstOrDefault(predicate?: any) {
    throw new Error("Method not implemented.");
  }
  forEach(action: Linq.Action<TOut>): void {
    throw new Error("Method not implemented.");
  }
  groupBy<TKey extends Linq.Indexer>(keySelector: Linq.Selector<TOut, TKey>): IEnumerable<Linq.IGrouping<TKey, TOut>>;
  groupBy<TKey extends Linq.Indexer, TValue>(keySelector: Linq.Selector<TOut, TKey>, valueSelector: Linq.Selector<TOut, TValue>): IEnumerable<Linq.IGrouping<TKey, TValue>>;
  groupBy(keySelector: any, valueSelector?: any) {
    throw new Error("Method not implemented.");
  }
  last(): TOut;
  last(predicate: Linq.Predicate<TOut>): TOut;
  last(predicate?: any) {
    throw new Error("Method not implemented.");
  }
  lastOrDefault(): TOut;
  lastOrDefault(predicate: Linq.Predicate<TOut>): TOut;
  lastOrDefault(predicate?: any) {
    throw new Error("Method not implemented.");
  }
  max(): TOut;
  max<TSelectorOut>(selector: Linq.Selector<TOut, TSelectorOut>): TSelectorOut;
  max(selector?: any) {
    throw new Error("Method not implemented.");
  }
  min(): TOut;
  min<TSelectorOut>(selector: Linq.Selector<TOut, TSelectorOut>): TSelectorOut;
  min(selector?: any) {
    throw new Error("Method not implemented.");
  }
  orderBy<TKey>(keySelector: Linq.Selector<TOut, TKey>): Linq.IOrderedEnumerable<TOut>;
  orderBy<TKey>(keySelector: Linq.Selector<TOut, TKey>, comparer: Linq.Comparer<TKey>): Linq.IOrderedEnumerable<TOut>;
  orderBy(keySelector: any, comparer?: any) {
    throw new Error("Method not implemented.");
  }
  orderByDescending<TKey>(keySelector: Linq.Selector<TOut, TKey>): Linq.IOrderedEnumerable<TOut> {
    throw new Error("Method not implemented.");
  }
  reverse(): IEnumerable<TOut> {
    throw new Error("Method not implemented.");
  }
  select<TSelectorOut>(selector: Linq.Selector<TOut, TSelectorOut>): IEnumerable<TSelectorOut> {
    throw new Error("Method not implemented.");
  }
  selectMany<TSelectorOut>(selector: Linq.Selector<TOut, TSelectorOut[] | Linq.IQueryable<TSelectorOut>>): IEnumerable<TSelectorOut> {
    throw new Error("Method not implemented.");
  }
  sequenceEqual(other: Linq.IQueryable<TOut> | TOut[]): boolean;
  sequenceEqual(other: Linq.IQueryable<TOut> | TOut[], comparer: Linq.EqualityComparer<TOut>): boolean;
  sequenceEqual(other: any, comparer?: any) {
    throw new Error("Method not implemented.");
  }
  single(): TOut;
  single(predicate: Linq.Predicate<TOut>): TOut;
  single(predicate?: any) {
    throw new Error("Method not implemented.");
  }
  singleOrDefault(): TOut;
  singleOrDefault(predicate: Linq.Predicate<TOut>): TOut;
  singleOrDefault(predicate?: any) {
    throw new Error("Method not implemented.");
  }
  skip(amount: number): IEnumerable<TOut> {
    throw new Error("Method not implemented.");
  }
  skipWhile(predicate: Linq.Predicate<TOut>): IEnumerable<TOut> {
    throw new Error("Method not implemented.");
  }
  sum(selector: Linq.Selector<TOut, number>): number {
    throw new Error("Method not implemented.");
  }
  take(amount: number): IEnumerable<TOut> {
    throw new Error("Method not implemented.");
  }
  takeWhile(predicate: Linq.Predicate<TOut>): IEnumerable<TOut> {
    throw new Error("Method not implemented.");
  }
  union(other: Linq.IQueryable<TOut>): IEnumerable<TOut> {
    throw new Error("Method not implemented.");
  }
  where(predicate: Linq.Predicate<TOut>): IEnumerable<TOut> {
    throw new Error("Method not implemented.");
  }
  zip<TOther, TSelectorOut>(other: Linq.IQueryable<TOther> | TOther[], selector: Linq.ZipSelector<TOut, TOther, TSelectorOut>): IEnumerable<TSelectorOut> {
    throw new Error("Method not implemented.");
  }

  reset(): void {
    this.source.reset();
  }

  next(): boolean {
    return this.source.next();
  }
}
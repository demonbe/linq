declare namespace Linq {
  type Dynamic = any;
  type Type = "string" | "number" | "boolean" | "symbol" | "undefined" | "object" | "function" | "bigint";
  type Indexer = number | string;
  type Primitive = number | string | boolean;
  type Selector<TElement, TOut> = (element: TElement) => TOut;
  type ZipSelector<TElement, TOther, TOut> = (first: TElement, second: TOther) => TOut;
  type Predicate<TElement> = Selector<TElement, boolean>;
  type Aggregator<TElement, TValue> = (previous: TValue, current: TElement) => TValue;
  type Action<TElement> = (element: TElement, index: number) => void;

  interface IReadOnlyList<TElement> extends IQueryable<TElement> {

  }

  interface IList<TElement> extends IReadOnlyList<TElement> {
    push(element: TElement): number;
  }

  interface IStack<TElement> extends IQueryable<TElement> {

  }

  interface IReadOnlyDictionary<TKey extends Indexer, TValue> extends IQueryable<IKeyValue<TKey, TValue>> {

  }

  interface IDictionary<TKey extends Indexer, TValue> extends IReadOnlyDictionary<TKey, TValue> {

  }

  abstract class EnumerableCollection<TElement> implements IQueryable<TElement>{
    copy(): IQueryable<TElement>;
    asEnumerable(): IEnumerable<TElement>;
    toArray(): TElement[];
    toList(): IList<TElement>;
    toDictionary<TKey extends Indexer, TValue>(keySelector: Selector<TElement, TKey>, valueSelector: Selector<TElement, TValue>): IDictionary<TKey, TValue>;
    aggregate(aggregator: Aggregator<TElement, TElement>): TElement;
    aggregate<TValue>(aggregator: Aggregator<TElement, TValue>, initialValue: TValue): TValue;
    all(predicate: Predicate<TElement>): boolean;
    any(): boolean;
    any(predicate: Predicate<TElement>): boolean;
    average(selector: Selector<TElement, number>): number;
    concat(other: IQueryable<TElement> | TElement[], ...others: (IQueryable<TElement> | TElement[])[]): IEnumerable<TElement>;
    contains(element: TElement): boolean;
    count(): number;
    count(predicate: Predicate<TElement>): number;
    defaultIfEmpty(): IEnumerable<TElement>;
    defaultIfEmpty(defaultValue: TElement): IEnumerable<TElement>;
    distinct(): IEnumerable<TElement>;
    distinct<TKey>(keySelector: Selector<TElement, TKey>): IEnumerable<TElement>;
    elementAt(index: number): TElement;
    elementAtOrDefault(index: number): TElement;
    except(other: IQueryable<TElement>): IEnumerable<TElement>;
    first(): TElement;
    first(predicate: Predicate<TElement>): TElement;
    firstOrDefault(): TElement;
    firstOrDefault(predicate: Predicate<TElement>): TElement;
    forEach(action: Action<TElement>): void;
    groupBy<TKey extends Indexer>(keySelector: Selector<TElement, TKey>): IEnumerable<IGrouping<TKey, TElement>>;
    groupBy<TKey extends Indexer, TValue>(keySelector: Selector<TElement, TKey>, valueSelector: Selector<TElement, TValue>): IEnumerable<IGrouping<TKey, TValue>>;
    last(): TElement;
    last(predicate: Predicate<TElement>): TElement;
    lastOrDefault(): TElement;
    lastOrDefault(predicate: Predicate<TElement>): TElement;
    max(): TElement;
    max<TSelectorOut>(selector: Selector<TElement, TSelectorOut>): TSelectorOut;
    min(): TElement;
    min<TSelectorOut>(selector: Selector<TElement, TSelectorOut>): TSelectorOut;
    orderBy<TKey>(keySelector: Selector<TElement, TKey>): IOrderedEnumerable<TElement>;
    orderBy<TKey>(keySelector: Selector<TElement, TKey>, comparer: Comparer<TKey>): IOrderedEnumerable<TElement>;
    orderByDescending<TKey>(keySelector: Selector<TElement, TKey>): IOrderedEnumerable<TElement>;
    reverse(): IEnumerable<TElement>;
    select<TSelectorOut>(selector: Selector<TElement, TSelectorOut>): IEnumerable<TSelectorOut>;
    selectMany<TSelectorOut>(selector: Selector<TElement, TSelectorOut[] | IQueryable<TSelectorOut>>): IEnumerable<TSelectorOut>;
    sequenceEqual(other: IQueryable<TElement> | TElement[]): boolean;
    sequenceEqual(other: IQueryable<TElement> | TElement[], comparer: EqualityComparer<TElement>): boolean;
    single(): TElement;
    single(predicate: Predicate<TElement>): TElement;
    singleOrDefault(): TElement;
    singleOrDefault(predicate: Predicate<TElement>): TElement;
    skip(amount: number): IEnumerable<TElement>;
    skipWhile(predicate: Predicate<TElement>): IEnumerable<TElement>;
    sum(selector: Selector<TElement, number>): number;
    take(amount: number): IEnumerable<TElement>;
    takeWhile(predicate: Predicate<TElement>): IEnumerable<TElement>;
    union(other: IQueryable<TElement>): IEnumerable<TElement>;
    where(predicate: Predicate<TElement>): IEnumerable<TElement>;
    zip<TOther, TSelectorOut>(other: IQueryable<TOther> | TOther[], selector: ZipSelector<TElement, TOther, TSelectorOut>): IEnumerable<TSelectorOut>;
  }

  abstract class ArrayQueryable<TElement> extends EnumerableCollection<TElement> {
    constructor();
    constructor(elements?: TElement[]);
  }

  class List<TElement> extends ArrayQueryable<TElement> implements IList<TElement>{
    constructor();
    constructor(elements?: TElement[]);
    push(element: TElement): number;
  }
}
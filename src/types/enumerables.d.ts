declare namespace Linq {
  interface IKeyValue<TKey, TValue> {
    key: TKey;
    value: TValue;
  }

  type IGrouping<TKey, TElement> = IKeyValue<TKey, IQueryable<TElement>>;

  interface IQueryable<TOut> {
    copy(): IQueryable<TOut>;
    asEnumerable(): IEnumerable<TOut>;
    toArray(): TOut[];
    toList(): IList<TOut>;
    toDictionary<TKey extends Indexer, TValue>(keySelector: Selector<TOut, TKey>, valueSelector: Selector<TOut, TValue>): IDictionary<TKey, TValue>;

    aggregate(aggregator: Aggregator<TOut, TOut | undefined>): TOut;
    aggregate<TValue>(aggregator: Aggregator<TOut, TValue>, initialValue: TValue): TValue;

    all(predicate: Predicate<TOut>): boolean;

    any(): boolean;
    any(predicate: Predicate<TOut>): boolean;

    average(selector: Selector<TOut, number>): number;

    concat(other: TOut[] | IQueryable<TOut>, ...others: Array<TOut[] | IQueryable<TOut>>): IEnumerable<TOut>;
    contains(element: TOut): boolean;

    count(): number;
    count(predicate: Predicate<TOut>): number;

    defaultIfEmpty(): IEnumerable<TOut | undefined>;
    defaultIfEmpty(defaultValue: TOut): IEnumerable<TOut>;

    distinct(): IEnumerable<TOut>;
    distinct<TKey>(keySelector: Selector<TOut, TKey>): IEnumerable<TOut>;

    elementAt(index: number): TOut;

    elementAtOrDefault(index: number): TOut | undefined;

    except(other: IQueryable<TOut>): IEnumerable<TOut>;

    first(): TOut;
    first(predicate: Predicate<TOut>): TOut;

    firstOrDefault(): TOut | undefined;
    firstOrDefault(predicate: Predicate<TOut>): TOut | undefined;

    forEach(action: Action<TOut>): void;

    groupBy<TKey extends Indexer>(keySelector: Selector<TOut, TKey>): IEnumerable<IGrouping<TKey, TOut>>;
    groupBy<TKey extends Indexer, TValue>(keySelector: Selector<TOut, TKey>, valueSelector: Selector<TOut, TValue>): IEnumerable<IGrouping<TKey, TValue>>;

    last(): TOut;
    last(predicate: Predicate<TOut>): TOut;

    lastOrDefault(): TOut | undefined;
    lastOrDefault(predicate: Predicate<TOut>): TOut | undefined;

    max(): TOut;
    max<TSelectorOut>(selector: Selector<TOut, TSelectorOut>): TSelectorOut;

    min(): TOut;
    min<TSelectorOut>(selector: Selector<TOut, TSelectorOut>): TSelectorOut;

    orderBy<TKey>(keySelector: Selector<TOut, TKey>): IOrderedEnumerable<TOut>;
    orderBy<TKey>(keySelector: Selector<TOut, TKey>, comparer: Comparer<TKey>): IOrderedEnumerable<TOut>;

    orderByDescending<TKey>(keySelector: Selector<TOut, TKey>): IOrderedEnumerable<TOut>;

    reverse(): IEnumerable<TOut>;


    select<TSelectorOut>(selector: Selector<TOut, TSelectorOut>): IEnumerable<TSelectorOut>;

    selectMany<TSelectorOut>(selector: Selector<TOut, TSelectorOut[] | IQueryable<TSelectorOut>>): IEnumerable<TSelectorOut>;

    sequenceEqual(other: IQueryable<TOut> | TOut[]): boolean;
    sequenceEqual(other: IQueryable<TOut> | TOut[], comparer: EqualityComparer<TOut>): boolean;

    single(): TOut;
    single(predicate: Predicate<TOut>): TOut;

    singleOrDefault(): TOut | undefined;
    singleOrDefault(predicate: Predicate<TOut>): TOut | undefined;

    skip(amount: number): IEnumerable<TOut>;

    skipWhile(predicate: Predicate<TOut>): IEnumerable<TOut>;

    sum(selector: Selector<TOut, number>): number;

    take(amount: number): IEnumerable<TOut>;

    takeWhile(predicate: Predicate<TOut>): IEnumerable<TOut>;

    union(other: IQueryable<TOut>): IEnumerable<TOut>;

    where(predicate: Predicate<TOut>): IEnumerable<TOut>;

    zip<TOther, TSelectorOut>(other: IQueryable<TOther> | TOther[], selector: ZipSelector<TOut, TOther, TSelectorOut>): IEnumerable<TSelectorOut>;
  }

  interface IEnumerable<TOut> extends IQueryable<TOut>, IIterable<TOut> {
    copy(): IEnumerable<TOut>;
  }

  interface IUniqueEnumerable<TElement, TKey> extends IEnumerable<TElement> {
  }

  interface IConditionalEnumerable<TElement> extends IEnumerable<TElement> {
  }

  interface ITransformEnumerable<TElement, TKey> extends IEnumerable<TElement> {
  }

  interface IOrderedEnumerable<TOut> extends IEnumerable<TOut> {

  }

  abstract class EnumerableBase<TElement, TOut> implements IEnumerable<TOut>{
    reset(): void;
    next(): boolean;
    value(): TOut;
    copy(): IEnumerable<TOut>;
    asEnumerable(): IEnumerable<TOut>;
    toArray(): TOut[];
    toList(): IList<TOut>;
    toDictionary<TKey extends Indexer, TValue>(keySelector: Selector<TOut, TKey>, valueSelector: Selector<TOut, TValue>): IDictionary<TKey, TValue>;
    aggregate(aggregator: Aggregator<TOut, TOut>): TOut;
    aggregate<TValue>(aggregator: Aggregator<TOut, TValue>, initialValue: TValue): TValue;
    all(predicate: Predicate<TOut>): boolean;
    any(): boolean;
    any(predicate: Predicate<TOut>): boolean;
    average(selector: Selector<TOut, number>): number;
    concat(other: IQueryable<TOut> | TOut[], ...others: (IQueryable<TOut> | TOut[])[]): IEnumerable<TOut>;
    contains(element: TOut): boolean;
    count(): number;
    count(predicate: Predicate<TOut>): number;
    defaultIfEmpty(): IEnumerable<TOut>;
    defaultIfEmpty(defaultValue: TOut): IEnumerable<TOut>;
    distinct(): IEnumerable<TOut>;
    distinct<TKey>(keySelector: Selector<TOut, TKey>): IEnumerable<TOut>;
    elementAt(index: number): TOut;
    elementAtOrDefault(index: number): TOut;
    except(other: IQueryable<TOut>): IEnumerable<TOut>;
    first(): TOut;
    first(predicate: Predicate<TOut>): TOut;
    firstOrDefault(): TOut;
    firstOrDefault(predicate: Predicate<TOut>): TOut;
    forEach(action: Action<TOut>): void;
    groupBy<TKey extends Indexer>(keySelector: Selector<TOut, TKey>): IEnumerable<IGrouping<TKey, TOut>>;
    groupBy<TKey extends Indexer, TValue>(keySelector: Selector<TOut, TKey>, valueSelector: Selector<TOut, TValue>): IEnumerable<IGrouping<TKey, TValue>>;
    last(): TOut;
    last(predicate: Predicate<TOut>): TOut;
    lastOrDefault(): TOut;
    lastOrDefault(predicate: Predicate<TOut>): TOut;
    max(): TOut;
    max<TSelectorOut>(selector: Selector<TOut, TSelectorOut>): TSelectorOut;
    min(): TOut;
    min<TSelectorOut>(selector: Selector<TOut, TSelectorOut>): TSelectorOut;
    orderBy<TKey>(keySelector: Selector<TOut, TKey>): IOrderedEnumerable<TOut>;
    orderBy<TKey>(keySelector: Selector<TOut, TKey>, comparer: Comparer<TKey>): IOrderedEnumerable<TOut>;
    orderByDescending<TKey>(keySelector: Selector<TOut, TKey>): IOrderedEnumerable<TOut>;
    reverse(): IEnumerable<TOut>;
    select<TSelectorOut>(selector: Selector<TOut, TSelectorOut>): IEnumerable<TSelectorOut>;
    selectMany<TSelectorOut>(selector: Selector<TOut, TSelectorOut[] | IQueryable<TSelectorOut>>): IEnumerable<TSelectorOut>;
    sequenceEqual(other: IQueryable<TOut> | TOut[]): boolean;
    sequenceEqual(other: IQueryable<TOut> | TOut[], comparer: EqualityComparer<TOut>): boolean;
    single(): TOut;
    single(predicate: Predicate<TOut>): TOut;
    singleOrDefault(): TOut;
    singleOrDefault(predicate: Predicate<TOut>): TOut;
    skip(amount: number): IEnumerable<TOut>;
    skipWhile(predicate: Predicate<TOut>): IEnumerable<TOut>;
    sum(selector: Selector<TOut, number>): number;
    take(amount: number): IEnumerable<TOut>;
    takeWhile(predicate: Predicate<TOut>): IEnumerable<TOut>;
    union(other: IQueryable<TOut>): IEnumerable<TOut>;
    where(predicate: Predicate<TOut>): IEnumerable<TOut>;
    zip<TOther, TSelectorOut>(other: IQueryable<TOther> | TOther[], selector: ZipSelector<TOut, TOther, TSelectorOut>): IEnumerable<TSelectorOut>;
  }
}

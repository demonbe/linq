declare namespace Linq {
  interface IKeyValue<TKey, TValue> {
    key: TKey;
    value: TValue;
  }

  type IGrouping<TKey, TElement> = IKeyValue<TKey, IQueryable<TElement>>;

  interface IQueryable<TOut> {

  }

  interface IEnumerable<TOut> extends IQueryable<TOut>, IIterable<TOut> {

  }

  interface IOrderedEnumerable<TOut> extends IEnumerable<TOut> {

  }
}

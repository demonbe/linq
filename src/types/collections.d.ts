declare namespace Linq {
  interface IReadOnlyList<TElement> extends IQueryable<TElement> {

  }

  interface IList<TElement> extends IReadOnlyList<TElement> {

  }

  interface IStack<TElement> extends IQueryable<TElement> {

  }

  abstract class ArrayQueryable<TElement> {
    constructor();
    constructor(elements?: TElement[]);
  }

  class List<TElement> extends ArrayQueryable<TElement>{
    constructor();
    constructor(elements?: TElement[]);
  }
}
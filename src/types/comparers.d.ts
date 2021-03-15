declare namespace Linq {
  type ComparerResult = -1 | 0 | 1;
  type Comparer<T> = (left: T, right: T) => ComparerResult;
  type EqualityComparer<T> = (left: T, right: T) => boolean;
}
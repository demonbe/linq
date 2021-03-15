declare namespace Linq {
  interface IIterable<TElement> {
    copy(): IIterable<TElement>;
    reset(): void;
    next(): boolean;
    value(): TElement;
  }
}

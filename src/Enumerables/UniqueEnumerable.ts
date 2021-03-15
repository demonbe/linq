import { Enumerable } from ".";
import { IEnumerable, Selector, IUniqueEnumerable, Dynamic } from "../types";

export class UniqueEnumerable<TElement, TKey> extends Enumerable<TElement> implements IUniqueEnumerable<TElement, TKey>{
  protected source: IEnumerable<TElement>;
  private _keySelector: Selector<TElement, TKey> | undefined;
  private _seen: { primitive: Dynamic, complex: Array<TElement | TKey> };

  public constructor(source: IEnumerable<TElement>, keySelector?: Selector<TElement, TKey>) {
    super(source);
    this._keySelector = keySelector;
    this._seen = { primitive: { number: {}, string: {}, boolean: {} }, complex: [] };
  }

  public cpoy(): IUniqueEnumerable<TElement, TKey> {
    return new UniqueEnumerable(this.source.copy(), this._keySelector);
  }

  public reset(): void {
    super.reset();
    this._seen = { primitive: { number: {}, string: {}, boolean: {} }, complex: [] };
  }

  public isUnique(element: TElement): boolean {
    const key = this._keySelector !== undefined ? this._keySelector(element) : element;
    const type = typeof key;
    return (type in this._seen.primitive)
      ? this._seen.primitive[type].hasOwnProperty(key)
        ? false
        : this._seen.primitive[type][key] = true
      : this._seen.complex.indexOf(key) !== -1
        ? false
        : this._seen.complex.push(key) > -1;
  }

  public next(): boolean {
    let hasValue: boolean;
    do {
      hasValue = super.next();
    }
    
    while (hasValue && !this.isUnique(this.value()));

    return hasValue;
  }
}
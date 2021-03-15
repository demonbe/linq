import { Enumerable } from ".";
import { IEnumerable, Predicate, IConditionalEnumerable } from "../types";

export class ConditionalEnumerable<TElement> extends Enumerable<TElement> implements IConditionalEnumerable<TElement>{
  protected source: IEnumerable<TElement>;
  private _predicate: Predicate<TElement>;

  public constructor(source: IEnumerable<TElement>, predicate: Predicate<TElement>) {
    super(source);
    this._predicate = predicate;
  }

  public copy(): IConditionalEnumerable<TElement> {
    return new ConditionalEnumerable<TElement>(this.source.copy(), this._predicate);
  }

  public next(): boolean {
    let hasValue: boolean;

    do {
      hasValue = super.next();
    }
    while (hasValue && !this._predicate(this.value()));

    return hasValue;
  }
}
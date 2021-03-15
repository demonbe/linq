import { EnumerableBase } from ".";
import { IEnumerable, Selector, ICached, ITransformEnumerable } from "../types";
import { Cached } from "../Utils";

export class TransformEnumerable<TElement, TOut> extends EnumerableBase<TElement, TOut> implements ITransformEnumerable<TElement, TOut>{
  protected source: IEnumerable<TElement>;
  private _transform: Selector<TElement, TOut>;
  private _currentValue: ICached<TOut>;

  public constructor(source: IEnumerable<TElement>, transform: Selector<TElement, TOut>) {
    super(source);
    this._transform = transform;
    this._currentValue = new Cached<TOut>();
  }

  public copy(): ITransformEnumerable<TElement, TOut> {
    return new TransformEnumerable<TElement, TOut>(this.source.copy(), this._transform);
  }

  public value(): TOut {
    if (!this._currentValue.isValid()) {
      this._currentValue.value = this._transform(this.source.value());
    }

    return this._currentValue.value;
  }

  public reset(): void {
    super.reset();
    this._currentValue.invalidate();
  }

  public next(): boolean {
    this._currentValue.invalidate();

    return super.next();
  }
}
declare namespace Linq {
  interface ICached<T> {
    invalidate(): void;
    isValid(): boolean;
    value: T;
  }
}
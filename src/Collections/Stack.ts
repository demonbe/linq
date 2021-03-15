import { IStack } from "../types";
import { ArrayQueryable } from "./ArrayQueryable";

export class Stack<TElement> extends ArrayQueryable<TElement> implements IStack<TElement>{
  public copy(): Linq.IQueryable<TElement> {
    throw new Error("Method not implemented.");
  }
}
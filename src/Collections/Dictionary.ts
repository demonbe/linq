import { ArrayEnumerable } from "../Enumerables";
import { IDictionary, IEnumerable, IKeyValue, IList, Indexer, IReadOnlyDictionary, Selector } from "../types";
import { EnumerableCollection } from "./EnumerableCollection";
import { List } from "./List";

export class Dictionary<TKey extends Indexer, TValue> extends EnumerableCollection<IKeyValue<TKey, TValue>> implements IDictionary<TKey, TValue>{
  protected dictionary: Map<TKey, TValue> = new Map<TKey, TValue>();

  public static fromArray<TArray, TKey extends Indexer, TValue>(
    array: TArray[],
    keySelector: Selector<TArray, TKey>,
    valueSelector: Selector<TArray, TValue>)
    : IDictionary<TKey, TValue> {
    const keyValuePairs = array.map<IKeyValue<TKey, TValue>>(v => {
      return {
        key: keySelector(v),
        value: valueSelector(v),
      };
    });

    return new Dictionary(keyValuePairs);
  }

  public static fromJsObject<TValue = string>(object: Object)
    : IDictionary<string, TValue> {
    const keys = new List(Object.getOwnPropertyNames(object));
    const keyValues = keys.select(k => <IKeyValue<string, TValue>>{ key: k, value: object[k] });

    return new Dictionary(keyValues.toArray());
  }

  constructor();
  constructor(keyValuePairs: Array<IKeyValue<TKey, TValue>>);
  constructor(keyValuePairs?: Array<IKeyValue<TKey, TValue>>) {
    super();

    if (keyValuePairs !== undefined) {
      keyValuePairs.forEach(item => this.set(item.key, item.value));
    }
  }

  public copy(): IDictionary<TKey, TValue> {
    return new Dictionary<TKey, TValue>(this.toArray());
  }

  public asReadOnly(): IReadOnlyDictionary<TKey, TValue> {
    return this;
  }

  public asEnumerable(): IEnumerable<IKeyValue<TKey, TValue>> {
    return new ArrayEnumerable(this.toArray());
  }

  public toArray(): Array<IKeyValue<TKey, TValue>> {
    return this.getKeys().select<IKeyValue<TKey, TValue>>(p => ({ key: p, value: this.dictionary.get(p) })).toArray();
  }

  public clear(): void {
    this.dictionary.clear();
  }

  public containsKey(key: TKey): boolean {
    return this.dictionary.has(key);
  }

  public containsValue(value: TValue): boolean {
    const keys = this.getKeys().toArray();;

    for (let i = 0; i < keys.length; i++) {
      if (this.dictionary.get(keys[i]) === value) {
        return true;
      }
    }

    return false;
  }

  public getKeys(): IList<TKey> {
    return new List<TKey>(Array.from(this.dictionary.keys()));
  }

  public getValues(): IList<TValue> {
    return new List<TValue>(Array.from(this.dictionary.values()));
  }

  public remove(key: TKey): void {
    if (this.containsKey(key)) {
      this.dictionary.delete(key);
    }
  }

  public get(key: TKey): TValue {
    if (!this.containsKey(key)) {
      throw new Error(`Key doesn't exist: ${key}`)
    }

    return this.dictionary.get(key);
  }

  public set(key: TKey, value: TValue): void {
    if (this.containsKey(key)) {
      throw new Error(`Key already exists: ${key}`);
    }

    this.setOrUpdate(key, value);
  }

  public setOrUpdate(key: TKey, value: TValue): void {
    this.dictionary.set(key, value);
  }
}
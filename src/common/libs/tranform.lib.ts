export abstract class Transform<T> {
    abstract transform(item: T);
  
    transformCollection(items: T[]) {
      return items.map(this.transform);
    }
  }
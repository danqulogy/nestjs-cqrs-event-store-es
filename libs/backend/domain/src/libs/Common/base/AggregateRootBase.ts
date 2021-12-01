import { AggregateRoot } from "@nestjs/cqrs";

export class AggregateRootBase extends AggregateRoot{
  public Id: string

  static equals(a: AggregateRootBase, b: AggregateRootBase){
    if(a === null && b === null) return true
    if(a === null || b === null) return false

    return a.equals(b);
  }

  static notEquals(a: AggregateRootBase, b:AggregateRootBase){
    return !AggregateRootBase.equals(a,b);
  }

  equals(obj: Object): boolean{
    const other = obj as AggregateRootBase;

    if(other === null) return  false;

    if(this === other) return true;

    if(typeof this !== typeof other) return  false;

    if(this.Id === '' || other.Id === '') return  false;

    return  this.Id === other.Id;
  }

  notEquals(obj: Object): boolean {
    const other = obj as AggregateRootBase;
    return  !this.equals(other);
  }

  toString(){
    return this.Id.toString();
  }

}

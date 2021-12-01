// For advance equatability use  "@esfx/equatable";

export abstract class EntityBase extends Object{
  public Id: string

  static equals(a: EntityBase, b: EntityBase){
    if(a === null && b === null) return true
    if(a === null || b === null) return false

    return a.equals(b);
  }

  static notEquals(a: EntityBase, b:EntityBase){
    return !EntityBase.equals(a,b);
  }

  equals(obj: Object): boolean{
    const other = obj as EntityBase;

    if(other === null) return  false;

    if(this === other) return true;

    if(typeof this !== typeof other) return  false;

    if(this.Id === '' || other.Id === '') return  false;

    return  this.Id === other.Id;
  }

  notEquals(obj: Object): boolean {
    const other = obj as EntityBase;
    return  !this.equals(other);
  }

  toString(){
    return this.Id.toString();
  }


}

import { ValueObjectBase } from "./Common/base/ValueObjectBase";

export class Document extends ValueObjectBase<Document> {
  EmployeeId: string;

  constructor(employeeId) {
    super();
  }

  protected equalsCore(obj: Document): boolean {
    return false;
  }
}

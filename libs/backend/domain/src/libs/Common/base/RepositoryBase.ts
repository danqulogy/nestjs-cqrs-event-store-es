import { AggregateRootBase } from "./AggregateRootBase";

export abstract class RepositoryBase<T extends AggregateRootBase> {

  abstract GetById(id: string): T;

  abstract Save(aggregateRoot: T): void;

}


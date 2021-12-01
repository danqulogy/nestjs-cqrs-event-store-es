export abstract class Mapper<DomainModel, DTO, PersistenceModel>{
  abstract toDomain(raw: PersistenceModel): DomainModel;
  abstract toDTO(raw: PersistenceModel);
  abstract toPersistence();
}

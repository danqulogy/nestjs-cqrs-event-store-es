import { EntityBase } from "./EntityBase";

export class SampleEntity extends EntityBase{
  name;

  constructor(name: string) {
    super();
    this.name = name;
    this.Id = name;
  }

}


describe('Entity Base', () => {

  test('equals', ()=> {
    const a = new SampleEntity('Kofi');

    const b = new SampleEntity('Kofi');

    expect(EntityBase.equals(a, b)).toBe(true);

  });
})

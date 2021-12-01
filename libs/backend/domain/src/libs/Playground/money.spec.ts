import { Money } from './Money';
import { IllegalStateException } from '@maybert/backend/domain';

describe('Money', () => {
  test('equality', () => {
    const money1 = new Money(1, 1, 1, 1, 1, 1);
    const money2 = new Money(1, 1, 1, 1, 1, 1);

    const sum = Money.add(money1, money2);

    expect(money1).toStrictEqual(money2);
  });

  test('summation', () => {
    const money1 = new Money(1, 1, 1, 1, 1, 1);
    const money2 = new Money(1, 1, 1, 1, 1, 1);

    const sum = Money.add(money1, money2);

    expect(sum.OneDollarCount).toStrictEqual(2);
  });

  test('Cannot create money with negative value', () => {
    // const money =  new Money(-1,0,1,2,3,1);
    expect(() => new Money(-1, 0, 1, 2, 3, 1)).toThrowError(IllegalStateException);
  });

  test.each([
    [1, 0, 0, 0, 0, 0, 0.01],
    [0, 1, 0, 0, 0, 0, 0.02],
    [0, 0, 1, 0, 0, 0, 0.25],
    [0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 5],
    [0, 0, 0, 0, 0, 1, 20],
  ])(
    'amount is calculated correctly',
    (oneCent, twoCent, quarterCent, oneDollar, fiveDollar, twentyDollar, expected) => {
      const money = new Money(oneCent, twoCent, quarterCent, oneDollar, fiveDollar, twentyDollar);
      expect(money.Amount).toEqual(expected);
    }
  );

  test('Subtraction of two monies produces a correct results', () => {
    const money1 = new Money(10, 10, 10, 10, 10, 10);
    const money2 = new Money(1, 2, 3, 4, 5, 6);

    const result:Money = money1.subtract(money2);

    expect(result.OneCentCount).toEqual(9)
    expect(result.TwoCentCount).toEqual(8)
    expect(result.QuarterCount).toEqual(7)
    expect(result.OneDollarCount).toEqual(6)
    expect(result.FiveDollarCount).toEqual(5)
    expect(result.TwentyDollarCount).toEqual(4)

  })


  test('Cannot subtract more than exist', () => {
    const money1 = new Money(0, 1, 0, 0, 0, 0);
    const money2 = new Money(1, 0, 0, 0, 0, 0);

    expect(() =>money1.subtract(money2)).toThrowError(IllegalStateException);

  })
});

import { IllegalStateException, ValueObject } from '@maybert/backend/domain';
import { ValueObjectBase } from '../Common/base/ValueObjectBase';

export class Money extends ValueObjectBase<Money> {
  get TwentyDollarCount(): number {
    return this._TwentyDollarCount;
  }
  get FiveDollarCount(): number {
    return this._FiveDollarCount;
  }
  get OneDollarCount(): number {
    return this._OneDollarCount;
  }
  get QuarterCount(): number {
    return this._QuarterCount;
  }
  get TwoCentCount(): number {
    return this._TwoCentCount;
  }
  get OneCentCount(): number {
    return this._OneCentCount;
  }
  get Amount(): number {
    return (
      this._OneCentCount * 0.01 +
      this._TwoCentCount * 0.02 +
      this._QuarterCount * 0.25 +
      this._OneDollarCount +
      this._FiveDollarCount * 5 +
      this._TwentyDollarCount * 20
    );
  }
  private readonly _OneCentCount: number;
  private readonly _TwoCentCount: number;
  private readonly _QuarterCount: number;
  private readonly _OneDollarCount: number;
  private readonly _FiveDollarCount: number;
  private readonly _TwentyDollarCount: number;

  private _Amount: number;

  constructor(
    oneCentCount: number,
    twoCentCount: number,
    quarterCount: number,
    oneDollarCount: number,
    fiveDollarCount: number,
    twentyDollarCount: number
  ) {
    super();

    this._OneCentCount = oneCentCount;
    this._TwoCentCount = twoCentCount;
    this._QuarterCount = quarterCount;
    this._OneDollarCount = oneDollarCount;
    this._FiveDollarCount = fiveDollarCount;
    this._TwentyDollarCount = twentyDollarCount;

    Money.validateForNoNegativeValues(this);
  }

  private static validateForNoNegativeValues(money: Money){
    if (money._OneCentCount < 0) throw new IllegalStateException('One cents cannot be negative');
    if (money._TwoCentCount < 0) throw new IllegalStateException('Two cents cannot be negative');
    if (money._QuarterCount < 0) throw new IllegalStateException('Quarter cents cannot be negative');
    if (money._OneDollarCount < 0) throw new IllegalStateException('One dollar cannot be negative');
    if (money._FiveDollarCount < 0)
      throw new IllegalStateException('Five dollar cannot be negative');
    if (money._TwentyDollarCount < 0)
      throw new IllegalStateException('Twenty dollar cannot be negative');
  }

  static add(money1: Money, money2: Money): Money {
    return new Money(
      money1._OneDollarCount + money2._OneDollarCount,
      money1._TwoCentCount + money2._TwoCentCount,
      money1._QuarterCount + money2._QuarterCount,
      money1._OneDollarCount + money2._OneDollarCount,
      money1._FiveDollarCount + money2._FiveDollarCount,
      money1._TwentyDollarCount + money2._TwentyDollarCount
    );
  }

  protected equalsCore(obj: Money): boolean {
    return (
      this._OneDollarCount === obj._OneDollarCount &&
      this._TwoCentCount === obj._TwoCentCount &&
      this._QuarterCount === obj._QuarterCount &&
      this._OneDollarCount === obj._OneDollarCount &&
      this._FiveDollarCount === obj._FiveDollarCount &&
      this._TwentyDollarCount === obj._TwentyDollarCount
    );
  }

  subtract(money2: Money): Money {
    const results = new Money(
      this._OneCentCount - money2._OneCentCount,
      this._TwoCentCount - money2._TwoCentCount,
      this._QuarterCount - money2._QuarterCount,
      this._OneDollarCount - money2._OneDollarCount,
      this._FiveDollarCount - money2._FiveDollarCount,
      this._TwentyDollarCount - money2._TwentyDollarCount
    );
    Money.validateForNoNegativeValues(results);
    return  results;
  }
}

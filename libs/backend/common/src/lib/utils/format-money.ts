import Big from 'big.js';

export const formatMoney = function (value:number){
  Big.RM = Big.roundHalfUp
  return +(new Big(value).toFixed(2));

}

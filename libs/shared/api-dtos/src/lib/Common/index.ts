export * from './active-status-query-params.dto';
export * from './paginate-query-param.dto';
export * from './model-id-param.dto';
export * from './IActionResult';
export * from './gender.enum';
export * from './assets.index';
export * from './web-socket.events';

// Helper functions

const StringIsNumber = (value) => isNaN(Number(value));

export function EnumToArray(enumMember) {
  return Object.keys(enumMember)
    .filter(StringIsNumber)
    .map((key) => enumMember[key]);
}

export function datesAreOnSameDay(first: Date, second: Date) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

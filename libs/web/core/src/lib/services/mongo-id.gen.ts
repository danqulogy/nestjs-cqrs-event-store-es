export function getMongoId  () {
  const timestamp = (((new Date().getTime()) / 1000) | 0).toString(16);
  const id = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
    return (Math.random() * 16 | 0).toString(16);
  }).toLowerCase();
  console.log('generated id', id)
  return id
};

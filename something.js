const fs = require('fs');

const getDate = () => {
  const date = new Date();
  return date.toUTCString();
}
fs.appendFile('./logs/flame.log', getDate() + ' New text \n', (err) => {
  if (err) throw err
  console.log('Done!')
})
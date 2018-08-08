module.exports = () => {
  const date = new Date();
  //  get local machine time offset and calculate it into hours
  const offset = (new Date().getTimezoneOffset() / 60 * -1);
  //  add the offset and current time
  const dateString = new Date(date.getTime() + offset).toString();
  //  return current date and time formatted
  return dateString.substring(0, dateString.indexOf('(') - 1);
};

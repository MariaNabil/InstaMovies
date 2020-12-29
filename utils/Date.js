export const dateToLocalTimezone = (date, revert) => {
  Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
  };
  let offset = new Date().getTimezoneOffset() / 60;
  offset = revert ? offset : -1 * offset;
  date = date.addHours(offset);
  return date;
};

export const formatDate = (date) => {
  if (!date) {
    return '';
  }
  const d = date.slice(0, 10).split('-');
  return d[2] + '-' + d[1] + '-' + d[0];
};

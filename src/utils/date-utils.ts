const DateUtils = {
  UTC: () => {
    const date = new Date();
    return Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
    );
  },
  getFormattedDate: (date: Date | string) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();

    let month = (1 + formattedDate.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    let day = formattedDate.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
  },
};

export default DateUtils;

// function to format the date according to the provided format and optional utc offset
const dfmt = function (dt, fmt, utc) {
  const MMMM = [
    '\x00',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const MMM = [
    '\x01',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  const dddd = [
    '\x02',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  const ddd = ['\x03', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  let ii = (i, len) => {
    let s = i + '';
    len = len || 2;
    while (s.length < len) {
      s = '0' + s;
    }
    return s;
  };

  const y = utc ? dt.getUTCFullYear() : dt.getFullYear();
  fmt = fmt.replace(/(^|[^\\])yyyy+/g, '$1' + y);
  fmt = fmt.replace(/(^|[^\\])yy/g, '$1' + y.toString().substr(2, 2));
  fmt = fmt.replace(/(^|[^\\])y/g, '$1' + y);

  const M = (utc ? dt.getUTCMonth() : dt.getMonth()) + 1;
  fmt = fmt.replace(/(^|[^\\])MMMM+/g, '$1' + MMMM[0]);
  fmt = fmt.replace(/(^|[^\\])MMM/g, '$1' + MMM[0]);
  fmt = fmt.replace(/(^|[^\\])MM/g, '$1' + ii(M));
  fmt = fmt.replace(/(^|[^\\])M/g, '$1' + M);

  const d = utc ? dt.getUTCDate() : dt.getDate();
  fmt = fmt.replace(/(^|[^\\])dddd+/g, '$1' + dddd[0]);
  fmt = fmt.replace(/(^|[^\\])ddd/g, '$1' + ddd[0]);
  fmt = fmt.replace(/(^|[^\\])dd/g, '$1' + ii(d));
  fmt = fmt.replace(/(^|[^\\])d/g, '$1' + d);

  const H = utc ? dt.getUTCHours() : dt.getHours();
  fmt = fmt.replace(/(^|[^\\])HH+/g, '$1' + ii(H));
  fmt = fmt.replace(/(^|[^\\])H/g, '$1' + H);

  const h = H > 12 ? H - 12 : H === 0 ? 12 : H;
  fmt = fmt.replace(/(^|[^\\])hh+/g, '$1' + ii(h));
  fmt = fmt.replace(/(^|[^\\])h/g, '$1' + h);

  const m = utc ? dt.getUTCMinutes() : dt.getMinutes();
  fmt = fmt.replace(/(^|[^\\])mm+/g, '$1' + ii(m));
  fmt = fmt.replace(/(^|[^\\])m/g, '$1' + m);

  const s = utc ? dt.getUTCSeconds() : dt.getSeconds();
  fmt = fmt.replace(/(^|[^\\])ss+/g, '$1' + ii(s));
  fmt = fmt.replace(/(^|[^\\])s/g, '$1' + s);

  let f = utc ? dt.getUTCMilliseconds() : dt.getMilliseconds();
  fmt = fmt.replace(/(^|[^\\])fff+/g, '$1' + ii(f, 3));
  f = Math.round(f / 10);
  fmt = fmt.replace(/(^|[^\\])ff/g, '$1' + ii(f));
  f = Math.round(f / 10);
  fmt = fmt.replace(/(^|[^\\])f/g, '$1' + f);

  const A = H < 12 ? 'AM' : 'PM';
  fmt = fmt.replace(/(^|[^\\])AA+/g, '$1' + A);
  fmt = fmt.replace(/(^|[^\\])A/g, '$1' + A.charAt(0));

  const a = A.toLowerCase();
  fmt = fmt.replace(/(^|[^\\])aa+/g, '$1' + a);
  fmt = fmt.replace(/(^|[^\\])a/g, '$1' + a.charAt(0));

  let tz = -dt.getTimezoneOffset();
  let K = utc || !tz ? 'Z' : tz > 0 ? '+' : '-';
  if (!utc) {
    tz = Math.abs(tz);
    const tzHrs = Math.floor(tz / 60);
    const tzMin = tz % 60;
    K += ii(tzHrs) + ':' + ii(tzMin);
  }
  fmt = fmt.replace(/(^|[^\\])K/g, '$1' + K);

  const day = (utc ? dt.getUTCDay() : dt.getDay()) + 1;
  fmt = fmt.replace(new RegExp(dddd[0], 'g'), dddd[day]);
  fmt = fmt.replace(new RegExp(ddd[0], 'g'), ddd[day]);

  fmt = fmt.replace(new RegExp(MMMM[0], 'g'), MMMM[M]);
  fmt = fmt.replace(new RegExp(MMM[0], 'g'), MMM[M]);

  fmt = fmt.replace(/\\(.)/g, '$1');

  return fmt;
};

// export as default
module.exports = dfmt;

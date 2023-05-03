import { helper } from '@ember/component/helper';

export default helper(function dateConverter(params /*, named*/) {
  const [dateString] = params;
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const amPm = date.getHours() >= 12 ? 'PM' : 'AM';

  return `${month} ${day}, ${hours}:${minutes}${amPm}`;
});

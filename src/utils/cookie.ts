export function getCookie(name: string): undefined | string {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
export function setCookie(
  name: string,
  value: number | boolean | string,
  props: { [key: string]: any } & { expires?: number | string | Date } = {}
) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const dt = new Date();
    dt.setTime(dt.getTime() + exp * 20000);
    exp = props.expires = dt;
  }
  if (exp && (exp as Date).toUTCString) {
    props.expires = (exp as Date).toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}
export function deleteCookie(name: string) {
  setCookie(name, "", { expires: -1 });
}
export const formatDate = (date: string) => {
  const formatter = new Intl.DateTimeFormat("ru", {
    hour: "numeric",
    minute: "numeric",
    timeZone: "Europe/Moscow",
  });
  
  let dateOfOrder = new Date(date).getTime();
  const today = new Date().getTime();
  
    function diffSubtract(dayOne: number, dayTwo: number): number {
    return Math.ceil((dayOne - dayTwo) / 86400000);
     }
  let dCount = diffSubtract(today, dateOfOrder);
  
  const formatterForDay = new Intl.DateTimeFormat("ru", {
    day: "numeric",
    year: "numeric",
    month: "long",
    timeZone: "Europe/Moscow",
  });
  const formatDay = (dateOfOrder: number, dCount: number): string | undefined => {
    if (formatterForDay.format(today) === formatterForDay.format(dateOfOrder)) {
      return "Cегодня";
    }
    if (dCount === 1) {
      return "Вчера";
    }
    if (dCount === 2 || dCount === 3 || dCount === 4) {
      return `${dCount} дня назад`;
    }
    if (dCount > 4) {
      return `${dateOfOrder.toLocaleString("ru-RU")}`;
    }
  };
  return `${formatDay(dateOfOrder, dCount)}, ${formatter.format(
    dateOfOrder
  )} i-GMT+3`;
};

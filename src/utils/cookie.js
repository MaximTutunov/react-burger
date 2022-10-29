export function getCookie(name) {
    const matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  export function setCookie(name, value, props) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == "number" && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 20000);
      exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
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
  
  export function deleteCookie(name) {
    setCookie(name, null, { expires: -1 });
  }
  
  export const formatDate = (date) => {
    const formatter = new Intl.DateTimeFormat("ru", {
      hour: "numeric",
      minute: "numeric",
      timeZone: "Europe/Moscow",
    });
  
    let dateOfOrder = new Date(date);
  
    const today = new Date();
  
    function diffSubtract(dayOne, dayTwo) {
      return Math.ceil((dayOne - dayTwo) / 86400000);
    }
  
    let dayQty = diffSubtract(today, dateOfOrder);
  
    const formatterForDay = new Intl.DateTimeFormat("ru", {
      day: "numeric",
      year: "numeric",
      month: "long",
      timeZone: "Europe/Moscow",
    });
  
    const formatDay = (dateOfOrder, dayQty) => {
      if (formatterForDay.format(today) === formatterForDay.format(dateOfOrder)) {
        return "Cегодня";
      }
      if (dayQty === 1) {
        return "Вчера";
      }
      if (dayQty === 2 || dayQty === 3 || dayQty === 4) {
        return `${dayQty} дня назад`;
      }
      if (dayQty > 4) {
        return `${dateOfOrder.toLocaleDateString("ru-RU")}`;
      }
    };
    return `${formatDay(dateOfOrder, dayQty)}, ${formatter.format(
      dateOfOrder
    )} i-GMT+3`;
  };
  
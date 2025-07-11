/**
 *
 * @param {string} name
 * @returns
 */
export const getCookie = (name: string) => {
  const escape = (s: string) => {
    return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, "\\$1");
  };
  const match = document.cookie.match(
    RegExp("(?:^|;\\s*)" + escape(name) + "=([^;]*)")
  );
  return match ? match[1] : null;
};

export const setCookie = (name: any, value: any, days: any) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

export const deleteCookie = (name: any) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

import Cookies from 'js-cookie'

export const setCookie = (name: string, value: string, days: number): void => {
  Cookies.set(name, value, { expires: days })
}

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name)
}

export const removeCookie = (name: string): void => {
  Cookies.remove(name)
}

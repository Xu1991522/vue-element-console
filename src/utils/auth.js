import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const roleCodeKey = 'Role-code'
const roleListKey = 'Role-list'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getRoleCode() {
  return Cookies.get(roleCodeKey)
}

export function setRoleCode(roleCode) {
  return Cookies.set(roleCodeKey, roleCode)
}

export function removeRoleCode() {
  return Cookies.remove(roleListKey)
}

export function getRoleList() {
  return Cookies.get(roleListKey)
}

export function setRoleList(roleList) {
  return Cookies.set(roleListKey, roleList)
}

export function removeRoleList() {
  return Cookies.remove(roleListKey)
}

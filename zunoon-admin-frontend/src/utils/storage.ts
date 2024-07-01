import { USER } from "../constants/storage";

/**
 * Get value from storage for given key.
 */
export function get(key?: string): string | null {
  if (key) {
    return localStorage.getItem(key);
  }
  return null;
}

/**
 * Set key value pair in storage.
 *
 * @param {string} key
 * @param {string} value
 */
export function set(key: string, value: string | string[]): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function setUser(user: string, value: string) {
  localStorage.setItem(user, JSON.stringify(value));
}

/**
 * @returns {object} user parsed object
 */
export function getUser(): { [key: string]: any } | null {
  const user = localStorage.getItem(USER);
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

/**
 * Remove key value pair in storage.
 *
 * @param {string} key
 */
export function remove(key: string): void {
  localStorage.removeItem(key);
}

/**
 * Get access list from local storage
 * @returns {array} access lists
 */
export function getAccessList(): string[] | null {
  const accessString = get("userAccess");
  if (accessString) {
    const access = JSON.parse(accessString);
    return access;
  } else return null;
}

export function setAccessList(accesslist) {
  localStorage.setItem("userAccess", JSON.stringify(accesslist));
}

export function getPermissions() {
  const userString = get("user");
  if (userString) {
    const permissions = JSON.parse(userString).permissions;
    return permissions;
  } else return null;
}

/**
 * Clear storage.
 *
 * @return {string}
 */
export function clear(): void {
  return localStorage.clear();
}

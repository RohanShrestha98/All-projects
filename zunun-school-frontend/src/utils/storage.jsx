export const userDetailsHandler = (data, setAuth, setCookie) => {
  const userDetails = {
    idx: data.idx,
    fullName: data.first_name + " " + data.last_name,
    avatar: data.avatar,
    email: data.email,
    username: data.username,
    notifications: data.notifications,
  };

  setAuth(auth => ({ ...auth, ...userDetails }));
  setCookie("userDetails", userDetails, {
    path: "/",
  });
};

export const get = key => {
  if (key) {
    return localStorage.getItem(key);
  }
  return null;
};

export const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getPermissions = () => {
  const userString = get("user");
  if (userString) {
    const permissions = JSON.parse(userString).permissions;
    return permissions;
  } else return null;
};

export const clear = () => {
  return localStorage.clear();
};

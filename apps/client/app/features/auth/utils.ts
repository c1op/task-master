export const createAuthroizationHeader = (token: string) => {
  return `Bearer ${token}`;
};

export const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const deleteToken = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

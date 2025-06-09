import axios from "axios";

export const trackItem = async (token) => {
  return axios.post(
    "/api/users/me/stats/track",
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const donateItem = async (token) => {
  return axios.post(
    "/api/users/me/stats/donate",
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const saveWaste = async (token, amount) => {
  return axios.post(
    "/api/users/me/stats/waste",
    { amount },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

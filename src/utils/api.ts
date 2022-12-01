import { getCookie, setCookie } from "./cookie";

export const Api = {
  url: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application.json",
  },
};

export const checkResponse = (res:Response) => {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then((err) => Promise.reject(err));
  }
};

function request(url:string, options:RequestInit) {
  return fetch(url, options).then(res=>checkResponse(res));
}

export const getIngredientsData = async () => {
  return await request(`${Api.url}/ingredients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getUserRequest = async () => {
  return await fetchRefresh(`${Api.url}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
  });
};

export const updateUserRequest = async (email:string, name:string, password:string) => {
  return await fetchRefresh(`${Api.url}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({
      email: email,
      name: name,
      password: password,
    }),
  });
};

export const getOrderDetailsData = async (productsId:string[]) => {
  return await request(`${Api.url}/orders`, {
    method: "POST",
    body: JSON.stringify({
      ingredients: productsId,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
  });
};

export const forgotPassRequest = async (email:string) => {
  return await request(`${Api.url}/password-reset`, {
    method: "POST",
    body: JSON.stringify(email),
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  })
};

export const resetPassRequest = async (password:string, token:any) => {
  return await request(`${Api.url}/password-reset/reset`, {
    method: "POST",
    body: JSON.stringify(password, token),
    headers: {
      "Content-Type": "application/json",
    },
  })
};

export const loginRequest = async (email:string, password:string) => {
  return await request(`${Api.url}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
};

export const registerUserRequest = async (email:string, password:string, name:string) => {
  return await request(`${Api.url}/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
};

export const logoutRequest = async () => {
  return await request(`${Api.url}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
};

export const updateTokenRequest = async () => {
  return await request(`${Api.url}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
};

export const fetchRefresh = async (url:string, options:RequestInit) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err:any) {
    if (err.message === "jwt expired") {
      const refreshToken = await updateTokenRequest();
      const accessToken = refreshToken.accessToken.split("Bearer ")[1];
      if (!refreshToken.success) {
        Promise.reject(refreshToken);
      }
      localStorage.setItem("refreshToken", refreshToken.refreshToken);
      setCookie("token", accessToken);
      (options.headers as {[key:string]:string}).Authorization = refreshToken.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

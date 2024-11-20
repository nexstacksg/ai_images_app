// import { User } from "@/types/User";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import CryptoJS from "crypto-js";
import { jwtDecode } from "jwt-decode";

export const setToken = (token: string) => {
  const { exp } = jwtDecode(token) as any;
  const expires = new Date(exp * 1000);
  const cipherText = CryptoJS.AES.encrypt(
    JSON.stringify(token),
    "token"
  ).toString();
  setCookie("token", cipherText, {
    expires,
  });
};

export const setUserInfo = (token: string, userInfo: any) => {
  const { exp } = jwtDecode(token) as any;
  const expires = new Date(exp * 1000);
  console.log("userInfo", userInfo);
  const cipherUserInfo = CryptoJS.AES.encrypt(
    JSON.stringify(userInfo),
    "userInfo"
  ).toString();
  setCookie("userInfo", cipherUserInfo, {
    expires,
  });
};

export const getUserInfo = () => {
  const userinfo = getCookie("userInfo");

  if (!userinfo) {
    return null;
  }
  const userInfoBytes = CryptoJS.AES.decrypt(userinfo, "userInfo");
  try {
    const decryptedUserInfo = JSON.parse(
      userInfoBytes.toString(CryptoJS.enc.Utf8)
    );
    return decryptedUserInfo;
  } catch (err) {
    console.error("error", err);
  }
};

export const getToken = () => {
  const session = getCookie("token");
  if (!session) return false;
  const bytes = CryptoJS.AES.decrypt(session, "token");
  try {
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (err) {
    console.error("error", err);
  }
};

export const logout = () => {
  deleteCookie("token");
  deleteCookie("userInfo");
};

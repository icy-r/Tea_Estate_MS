// services
import * as tokenService from './auth-token.js'
import axios from "../services/axios.js";
// import {addPhoto as addProfilePhoto} from './profileService'

const BASE_URL = `http://localhost:3001/api/auth`;

async function signup(signupFormData, photoData) {
  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupFormData),
    });
    const json = await res.json();

    if (json.err) throw new Error(json.err);

    if (json.token) {
      tokenService.setToken(json.token);

      if (photoData) {
        // await addProfilePhoto(photoData)
      }
    }
  } catch (err) {
    throw new Error(err);
  }
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

async function login(loginFormData) {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginFormData),
    });
    const json = await res.json();

    if (json.err) throw new Error(json.err);

    if (json.token) tokenService.setToken(json.token);
  } catch (err) {
    throw new Error(err);
  }
}

async function changePassword(changePasswordFormData) {
  try {
    const res = await axios.post(
      `${BASE_URL}/change-password`,
      changePasswordFormData
    );
    const json = await res.json();

    if (json.err) throw new Error(json.err);

    if (json.token) {
      tokenService.removeToken();
      tokenService.setToken(json.token);
    }
  } catch (err) {
    throw new Error(err);
  }
}

async function userLogin(loginFormData) {
  try {
    const res = await axios.post(`${BASE_URL}/userLogin`, loginFormData);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
}

export { signup, getUser, logout, login, changePassword, userLogin };
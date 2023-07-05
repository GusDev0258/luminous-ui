import { BASE_URL } from "./DefaultUrl";

export async function registerUser(data) {
  return fetch(`${BASE_URL}auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data.payload),
  }).then((data) => data.json());
}

export async function loginUser(credentials) {
  const response = await fetch(`${BASE_URL}auth/authenticate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(credentials),
  }).then((data) => data.json());

  return response;
}

 export async function updateUser(token, {id}, userData) {
  const response = await fetch(`http://localhost:8080/api/user/${id}`, {
    method: 'PUT',
    headers: {
     Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${token}`
    },
    body: JSON.stringify(userData)
  })
  .then((data) => data.json());

  return response;
}

export async function deleteUser(token, {id}) {
  const response = await fetch(`http://localhost:8080/api/user/${id}`, {
    method: 'DELETE',
    headers: {
     Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${token}`
    },
  });

  return response;
}
export async function getUser(token, { id }) {
  const response = await fetch(`${BASE_URL}user/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((data) => data.json());

  return response;
}

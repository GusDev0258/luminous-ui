import { BASE_URL } from "./DefaultUrl";

export async function getAddressByUser(token, { id }) {
  const response = await fetch(`${BASE_URL}address/user/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
  return response;
}

export async function getAddressById(token, addressId){
  const response = await fetch(`${BASE_URL}address/${addressId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

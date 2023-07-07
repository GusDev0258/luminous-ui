import { BASE_URL } from "./DefaultUrl";

export async function getCurrentTariffFlag(token) {
  const response = await fetch(`${BASE_URL}tariffFlag/current`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  .then((data) => data.json());
  return response;
}
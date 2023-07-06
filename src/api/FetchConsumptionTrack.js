import { BASE_URL } from "./DefaultUrl";

export async function getCurrentConsumption(token, addressId) {
  const response = await fetch(`${BASE_URL}consumptionTrack/address/${addressId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
  return response;
}
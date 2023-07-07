import { BASE_URL } from "./DefaultUrl";

export const fetchConsumptionTrack = async (token, addressId) => {
  const response = await fetch(`${BASE_URL}consumptionTrack/address/${addressId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}
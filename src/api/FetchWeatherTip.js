import { BASE_URL } from "./DefaultUrl";

export async function getWeatherTips(token, { id }) {
  const response = await fetch(`${BASE_URL}weather-tip/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
  console.log(response);
  return response;
}

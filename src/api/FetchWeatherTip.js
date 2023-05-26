export async function getWeatherTips(token, {id}) {
  const response = await fetch(`http://localhost:8080/api/weather-tip/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Authorization':`Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  .then((data) => data.json());
  console.log(response);
  return response;
}
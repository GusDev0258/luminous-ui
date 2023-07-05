import { BASE_URL } from "./DefaultUrl";

export async function getDevicesOfAddress(token, id) {
  console.log(token, typeof(id));
  const response = await fetch(`${BASE_URL}device/all/address/${"10"}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
  return response;
}

export async function deleteDevice(token, id, addressId) {
  const response = await fetch(`${BASE_URL}device/${id}/address/${addressId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return true;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao excluir o equipamento");
  }
}

export async function updateDevice(token, deviceId, deviceData, addressId) {
  const response = await fetch(`${BASE_URL}device/${deviceId}/address/${addressId}`, 
  {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deviceData),
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao atualizar o equipamento");
  }
}
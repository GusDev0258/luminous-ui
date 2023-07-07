import { BASE_URL } from "./DefaultUrl";

export async function createAddressByUser(token, { id }) {
  const response = await fetch(`${BASE_URL}address/user/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
  return response;
}

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

export async function deleteAddressesOfUser(token, id, addressId) {
  const response = await fetch(`${BASE_URL}address/${addressId}/user/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    // Exclusão bem-sucedida
    return true;
  } else {
    // Tratar erros de exclusão
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao excluir endereço do usuário");
  }
}

export async function updateAddressById(token, userId, addressId, addressData) {
  const response = await fetch(`${BASE_URL}address/${addressId}/user/${userId}`, 
  {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addressData),
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao atualizar endereço do usuário");
  }
}

export async function getReportAddressById(token, addressId) {
  
  try {
    const response = await fetch(`${BASE_URL}report/address/${addressId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar dados do relatório de consumo.");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro ao buscar dados do relatório de consumo:", error);
    throw error;
  }
}


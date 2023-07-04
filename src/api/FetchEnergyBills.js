import { BASE_URL } from "./DefaultUrl";
import axios from "axios";

export const fetchAllEnergyBills = async (addressId, userToken) => {
  const response = await axios.get(
    `${BASE_URL}energyBill/getAll/${addressId}`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  const responseData = await response.data;
  return responseData;
};

export const registerEnergyBill = async (
  addressId,
  fileId,
  energyBillData,
  userToken
) => {
  const response = await axios.post(
    `${BASE_URL}energyBill/address/${addressId}/billFile/${fileId}`,
    {
      ...energyBillData,
    },
    {
      headers: {
        authorization: `Bearer ${userToken}`,
        Accept: "application/json",
        "Content-type": "application/json",
      },
    }
  );
  return response;
};

export const uploadBillFile = async (formData, token) => {
  const response = await axios.post(`${BASE_URL}billFile/upload`, formData, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-type": "multipart/form-data",
    },
  });
  const responseData = await response.data;
  return responseData;
};

export const updateEnergyBill = async (energyBillId, energyBillData, token) => {
  axios.put(
    `${BASE_URL}energyBill/${energyBillId}`,
    {
      ...energyBillData,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-type": "application/json",
      },
    }
  );
};

export const getEnergyBillById = async (energyBillId, token) => {
  const response = await axios.get(`${BASE_URL}energyBill/${energyBillId}`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-type": "application/json",
    },
  });
  const responseData = await response.data;
  return responseData;
};

export const deleteEnergyBillById = async (energyBillId, token) => {
  const response = await axios.delete(`${BASE_URL}energyBill/${energyBillId}`,{
    headers: {
      authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-type": "application/json",
    },
  });
  return response;
}

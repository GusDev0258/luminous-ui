export async function getAddressByUser(token, {id}) {
    const response = await fetch(`http://localhost:8080/api/address/user/${id}`, {
      method: 'GET',
      headers: {
       Accept: 'application/json',
       'Authorization':`Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((data) => data.json());
    return response;
}
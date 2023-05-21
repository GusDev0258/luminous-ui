export async function getWhiteTaxes(token) {
    let data = await fetch('http://localhost:8080/api/white-taxes/', {
      method: 'GET',
      headers: {
       Accept: 'application/json',
       'Authorization':`Bearer ${token}`,
       'Content-Type': 'application/json',
      },
    })
      .then(data => data.json())
      return data;

 }
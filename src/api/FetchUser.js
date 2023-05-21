export async function registerUser (data) {
    return fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: {
       Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data.payload)
    })
      .then(data => data.json());
  }

  export async function loginUser(credentials) {
    const response = await fetch('http://localhost:8080/api/auth/authenticate', {
      method: 'POST',
      headers: {
       Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(credentials)
    })
    .then((data) => data.json());

    return response;
 }
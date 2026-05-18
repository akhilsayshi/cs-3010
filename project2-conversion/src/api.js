const API_URL = 'http://localhost:3001/api'; // Change if needed

export async function loginUser(username, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (res.status === 200) return await res.json();
  if (res.status === 400) throw new Error('No account with that username.');
  if (res.status === 401) throw new Error('Incorrect password.');
  throw new Error('Login failed.');
}

export async function registerUser(username, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (res.status === 201) return await res.json();
  if (res.status === 409) throw new Error('Username already exists.');
  throw new Error('Registration failed.');
}

export async function getAccountDetails(userId) {
  const res = await fetch(`${API_URL}/account/${userId}`);
  if (res.status === 200) return await res.json();
  if (res.status === 204) return null;
  throw new Error('Failed to fetch account details.');
}

export async function upsertAccountDetails(userId, details) {
  const res = await fetch(`${API_URL}/account`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, ...details }),
  });
  if (res.status === 201 || res.status === 200) return await res.json();
  throw new Error('Failed to update account details.');
}

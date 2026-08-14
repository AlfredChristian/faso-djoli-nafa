const API_URL = "http://localhost:8000/api"

export async function registerDonor(data) {
  const res = await fetch(`${API_URL}/donors/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function publishNeed(data) {
  const res = await fetch(`${API_URL}/needs/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function getNeeds() {
  const res = await fetch(`${API_URL}/needs/`)
  return res.json()
}

export async function getMyProfile() {
  const res = await fetch(`${API_URL}/donors/me/`)
  return res.json()
}
const API_URL = "http://localhost:8000/api"

function authHeaders() {
  const token = localStorage.getItem("fdn_token")
  return token ? { Authorization: `Token ${token}` } : {}
}

function adminAuthHeaders() {
  const token = localStorage.getItem("fdn_admin_token")
  return token ? { Authorization: `Token ${token}` } : {}
}

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
    headers: { "Content-Type": "application/json", ...hospitalAuthHeaders() },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function getNeeds() {
  const res = await fetch(`${API_URL}/needs/`)
  return res.json()
}

export async function getMyProfile() {
  const res = await fetch(`${API_URL}/donors/me/`, { headers: authHeaders() })
  return res.json()
}

export async function getAdminStats() {
  const res = await fetch(`${API_URL}/admin/stats/`, { headers: adminAuthHeaders() })
  return res.json()
}

export async function getPendingHospitals() {
  const res = await fetch(`${API_URL}/admin/hospitals/pending/`, { headers: adminAuthHeaders() })
  return res.json()
}

export async function validateHospital(id) {
  const res = await fetch(`${API_URL}/admin/hospitals/${id}/validate/`, {
    method: "POST",
    headers: adminAuthHeaders(),
  })
  return res.json()
}

export async function rejectHospital(id) {
  const res = await fetch(`${API_URL}/admin/hospitals/${id}/reject/`, {
    method: "POST",
    headers: adminAuthHeaders(),
  })
  return res.json()
}

export async function getAllDonors() {
  const res = await fetch(`${API_URL}/admin/donors/`, { headers: adminAuthHeaders() })
  return res.json()
}

export async function getBloodGroupDistribution() {
  const res = await fetch(`${API_URL}/admin/blood-distribution/`, { headers: adminAuthHeaders() })
  return res.json()
}

export async function getStockLevels() {
  await new Promise((r) => setTimeout(r, 300))
  return [
    { id: 1, centre: "Centre de Ouagadougou", ville: "Ouagadougou", stock: 28, etat: "critique", xPct: 50.4, yPct: 47.9 },
    { id: 2, centre: "Centre de Bobo-Dioulasso", ville: "Bobo-Dioulasso", stock: 82, etat: "stable", xPct: 15.2, yPct: 68.8 },
    { id: 3, centre: "Centre de Koudougou", ville: "Koudougou", stock: 40, etat: "urgent", xPct: 39.7, yPct: 50.0 },
    { id: 4, centre: "Centre de Ouahigouya", ville: "Ouahigouya", stock: 65, etat: "stable", xPct: 39.0, yPct: 26.6 },
    { id: 5, centre: "Centre de Kaya", ville: "Kaya", stock: 55, etat: "stable", xPct: 55.9, yPct: 35.2 },
    { id: 6, centre: "Centre de Banfora", ville: "Banfora", stock: 70, etat: "stable", xPct: 9.3, yPct: 78.4 },
    { id: 7, centre: "Centre de Tenkodogo", ville: "Tenkodogo", stock: 22, etat: "critique", xPct: 65.0, yPct: 58.3 },
    { id: 8, centre: "Centre de Fada N'Gourma", ville: "Fada N'Gourma", stock: 48, etat: "urgent", xPct: 74.2, yPct: 53.3 },
  ]
}

export async function getDonationHistory() {
  const res = await fetch(`${API_URL}/donors/me/donations/`, { headers: authHeaders() })
  return res.json()
}

export async function updateProfile(data) {
  const res = await fetch(`${API_URL}/donors/me/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function getMyBadges() {
  await new Promise((r) => setTimeout(r, 300))
  return [
    { id: "premier", label: "Premier don", description: "Tu as fait ton tout premier don", earned: true },
    { id: "fidele", label: "Donneur fidèle", description: "3 dons ou plus", earned: true },
    { id: "heros", label: "Héros local", description: "5 dons ou plus", earned: false },
    { id: "rapide", label: "Réponse rapide", description: "Répondu à une alerte en moins d'1h", earned: true },
    { id: "raro", label: "Groupe rare", description: "Donneur d'un groupe sanguin rare (O-, AB-)", earned: true },
    { id: "legende", label: "Légende", description: "10 dons ou plus", earned: false },
  ]
}

function hospitalAuthHeaders() {
  const token = localStorage.getItem("fdn_hospital_token")
  return token ? { Authorization: `Token ${token}` } : {}
}

export async function registerHospital(data) {
  const res = await fetch(`${API_URL}/hospitals/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function loginHospital(email, password) {
  const res = await fetch(`${API_URL}/hospitals/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json()
  if (data.success && data.token) {
    localStorage.setItem("fdn_hospital_token", data.token)
  }
  return data
}

export async function getHospitalNeedsHistory() {
  const res = await fetch(`${API_URL}/hospitals/me/needs/`, { headers: hospitalAuthHeaders() })
  return res.json()
}

export async function sendOtp(telephone) {
  const res = await fetch(`${API_URL}/donors/send-otp/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ telephone }),
  })
  return res.json()
}

export async function verifyOtp(telephone, code) {
  const res = await fetch(`${API_URL}/donors/verify-otp/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ telephone, code }),
  })
  const data = await res.json()
  if (data.success && data.token) {
    localStorage.setItem("fdn_token", data.token)
  }
  return data
}

export async function adminLogin(email, password) {
  const res = await fetch(`${API_URL}/admin/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json()
  if (data.success && data.token) {
    localStorage.setItem("fdn_admin_token", data.token)
  }
  return data
}

export function isAdminLoggedIn() {
  return localStorage.getItem("fdn_admin") === "true"
}

export function setAdminLoggedIn(value) {
  if (value) {
    localStorage.setItem("fdn_admin", "true")
  } else {
    localStorage.removeItem("fdn_admin")
  }
}

export async function findMatchingDonors(groupe, lieu, urgence) {
  const res = await fetch(`${API_URL}/needs/match/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ groupe, lieu, urgence }),
  })
  return res.json()
}
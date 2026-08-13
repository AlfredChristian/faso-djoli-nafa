export async function registerDonor(data) {
  console.log("API → inscription donneur :", data)
  await new Promise((r) => setTimeout(r, 500))
  return { success: true }
}

export async function publishNeed(data) {
  console.log("API → publication besoin :", data)
  await new Promise((r) => setTimeout(r, 500))
  return { success: true }
}

export async function getNeeds() {
  await new Promise((r) => setTimeout(r, 300))
  return [
    { id: 1, hopital: "CHU Yalgado Ouédraogo", groupe: "O-", quantite: 5, urgence: "critique", lieu: "Ouagadougou" },
    { id: 2, hopital: "CHR Bobo-Dioulasso", groupe: "A+", quantite: 3, urgence: "urgent", lieu: "Bobo-Dioulasso" },
    { id: 3, hopital: "CMA Ouagadougou", groupe: "B+", quantite: 2, urgence: "normal", lieu: "Ouagadougou" },
  ]
}

export async function getMyProfile() {
  await new Promise((r) => setTimeout(r, 300))
  return {
    nom: "Awa Ouédraogo",
    groupe: "O-",
    ville: "Ouagadougou",
    dernierDon: "2026-03-15",
    nombreDons: 4,
    viesAidees: 12,
  }
}

export async function getAdminStats() {
  await new Promise((r) => setTimeout(r, 300))
  return {
    donneurs: 312,
    hopitaux: 14,
    besoinsActifs: 3,
    besoinsResolus: 47,
  }
}

export async function getPendingHospitals() {
  await new Promise((r) => setTimeout(r, 300))
  return [
    { id: 1, nom: "Clinique Notre-Dame", ville: "Ouagadougou", date: "2026-08-09" },
    { id: 2, nom: "CMA Koudougou", ville: "Koudougou", date: "2026-08-10" },
  ]
}

export async function validateHospital(id) {
  console.log("API → validation hôpital :", id)
  await new Promise((r) => setTimeout(r, 400))
  return { success: true }
}

export async function rejectHospital(id) {
  console.log("API → rejet hôpital :", id)
  await new Promise((r) => setTimeout(r, 400))
  return { success: true }
}

export async function getAllDonors() {
  await new Promise((r) => setTimeout(r, 300))
  return [
    { id: 1, nom: "Awa Ouédraogo", groupe: "O-", ville: "Ouagadougou", dernierDon: "2026-03-15", dons: 4 },
    { id: 2, nom: "Ibrahim Sawadogo", groupe: "A+", ville: "Ouagadougou", dernierDon: "2026-07-02", dons: 2 },
    { id: 3, nom: "Fatimata Kaboré", groupe: "O+", ville: "Bobo-Dioulasso", dernierDon: "2026-01-20", dons: 7 },
    { id: 4, nom: "Moussa Traoré", groupe: "B+", ville: "Ouagadougou", dernierDon: "2026-06-28", dons: 1 },
    { id: 5, nom: "Aminata Zongo", groupe: "AB-", ville: "Koudougou", dernierDon: "2025-12-05", dons: 5 },
    { id: 6, nom: "Boureima Compaoré", groupe: "O-", ville: "Ouagadougou", dernierDon: "2026-05-11", dons: 3 },
    { id: 7, nom: "Salamata Ouattara", groupe: "A-", ville: "Bobo-Dioulasso", dernierDon: "2026-04-02", dons: 2 },
    { id: 8, nom: "Rasmané Kaboré", groupe: "B-", ville: "Ouagadougou", dernierDon: "2026-02-18", dons: 6 },
  ]
}

export async function getBloodGroupDistribution() {
  await new Promise((r) => setTimeout(r, 300))
  return [
    { groupe: "O+", total: 98 },
    { groupe: "O-", total: 41 },
    { groupe: "A+", total: 76 },
    { groupe: "A-", total: 22 },
    { groupe: "B+", total: 45 },
    { groupe: "B-", total: 14 },
    { groupe: "AB+", total: 12 },
    { groupe: "AB-", total: 4 },
  ]
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
  await new Promise((r) => setTimeout(r, 300))
  return [
    { id: 1, date: "2026-03-15", centre: "CNTS Ouagadougou", quantite: 1, ville: "Ouagadougou" },
    { id: 2, date: "2025-12-02", centre: "CHU Yalgado Ouédraogo", quantite: 1, ville: "Ouagadougou" },
    { id: 3, date: "2025-08-20", centre: "CNTS Ouagadougou", quantite: 1, ville: "Ouagadougou" },
    { id: 4, date: "2025-04-11", centre: "CMA Secteur 30", quantite: 1, ville: "Ouagadougou" },
  ]
}

export async function updateProfile(data) {
  console.log("API → mise à jour profil :", data)
  await new Promise((r) => setTimeout(r, 500))
  return { success: true }
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

export async function sendOtp(telephone) {
  console.log("API → envoi code SMS à :", telephone)
  await new Promise((r) => setTimeout(r, 600))
  return { success: true }
}

export async function verifyOtp(telephone, code) {
  console.log("API → vérification code :", telephone, code)
  await new Promise((r) => setTimeout(r, 500))
  if (code.length === 4) {
    return { success: true }
  }
  return { success: false, error: "Code incorrect" }
}

export async function adminLogin(email, password) {
  console.log("API → connexion admin :", email)
  await new Promise((r) => setTimeout(r, 500))
  if (email && password.length >= 4) {
    return { success: true }
  }
  return { success: false, error: "Identifiants incorrects" }
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

const DONOR_POOL = [
  { id: "d1", prenom: "Awa" },
  { id: "d2", prenom: "Ibrahim" },
  { id: "d3", prenom: "Fatimata" },
  { id: "d4", prenom: "Moussa" },
  { id: "d5", prenom: "Aminata" },
  { id: "d6", prenom: "Boureima" },
  { id: "d7", prenom: "Salamata" },
  { id: "d8", prenom: "Rasmané" },
  { id: "d9", prenom: "Adama" },
  { id: "d10", prenom: "Aicha" },
]

const COOLDOWN_HOURS = 48

function getAlertLog() {
  try {
    return JSON.parse(localStorage.getItem("fdn_alert_log") || "{}")
  } catch {
    return {}
  }
}

function saveAlertLog(log) {
  localStorage.setItem("fdn_alert_log", JSON.stringify(log))
}

function hoursSince(isoDate) {
  return (Date.now() - new Date(isoDate).getTime()) / (1000 * 60 * 60)
}

export async function findMatchingDonors(groupe, lieu, urgence) {
  await new Promise((r) => setTimeout(r, 600))

  const log = getAlertLog()
  const candidates = DONOR_POOL.map((d) => ({
    ...d,
    distance: (Math.random() * 4 + 0.3).toFixed(1),
    lastAlertedAt: log[d.id] || null,
  })).sort((a, b) => a.distance - b.distance)

  const onCooldown = (d) => d.lastAlertedAt && hoursSince(d.lastAlertedAt) < COOLDOWN_HOURS

  const eligible = urgence === "critique" ? candidates : candidates.filter((d) => !onCooldown(d))
  const skippedForCooldown = urgence === "critique" ? 0 : candidates.filter(onCooldown).length

  const limit = urgence === "critique" ? 6 : 3
  const selected = eligible.slice(0, limit)

  const now = new Date().toISOString()
  selected.forEach((d) => { log[d.id] = now })
  saveAlertLog(log)

  return { alerted: selected, skippedForCooldown, remainingEligible: eligible.length - selected.length }
}
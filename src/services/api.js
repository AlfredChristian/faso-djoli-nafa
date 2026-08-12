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
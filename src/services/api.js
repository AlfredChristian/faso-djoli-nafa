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
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
import { jsPDF } from 'jspdf'
import logoUrl from '../assets/logo.png'

function loadImageAsDataUrl(url) {
  return fetch(url)
    .then((res) => res.blob())
    .then((blob) => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }))
}

export async function generateCertificate(profil, badges) {
  const logoData = await loadImageAsDataUrl(logoUrl)

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  const width = doc.internal.pageSize.getWidth()
  const height = doc.internal.pageSize.getHeight()

  // Fond crème très léger
  doc.setFillColor(252, 251, 249)
  doc.rect(0, 0, width, height, 'F')

  // Bande drapeau en bas
  const stripeH = 6
  doc.setFillColor(192, 57, 43)
  doc.rect(0, height - stripeH, width / 3, stripeH, 'F')
  doc.setFillColor(241, 196, 15)
  doc.rect(width / 3, height - stripeH, width / 3, stripeH, 'F')
  doc.setFillColor(30, 132, 73)
  doc.rect((2 * width) / 3, height - stripeH, width / 3, stripeH, 'F')

  // Double cadre décoratif
  doc.setDrawColor(192, 57, 43)
  doc.setLineWidth(1.2)
  doc.rect(10, 10, width - 20, height - 20 - stripeH)
  doc.setDrawColor(241, 196, 15)
  doc.setLineWidth(0.4)
  doc.rect(13, 13, width - 26, height - 26 - stripeH)

  // Logo (centré en haut)
  const logoW = 26
  const logoH = 22
  doc.addImage(logoData, 'PNG', width / 2 - logoW / 2, 18, logoW, logoH)

  // Titre
  doc.setFontSize(24)
  doc.setTextColor(192, 57, 43)
  doc.setFont('helvetica', 'bold')
  doc.text('ATTESTATION DE RECONNAISSANCE', width / 2, 50, { align: 'center' })

  doc.setFontSize(11)
  doc.setTextColor(100, 100, 100)
  doc.setFont('helvetica', 'italic')
  doc.text('Faso Djoli Nafa  —  Chaque don compte', width / 2, 57, { align: 'center' })

  // Ligne dorée de séparation
  doc.setDrawColor(241, 196, 15)
  doc.setLineWidth(0.6)
  doc.line(width / 2 - 30, 62, width / 2 + 30, 62)

  // Corps
  doc.setFontSize(13)
  doc.setTextColor(60, 60, 60)
  doc.setFont('helvetica', 'normal')
  doc.text('Ce document certifie que', width / 2, 76, { align: 'center' })

  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(30, 132, 73)
  doc.text(profil.nom, width / 2, 88, { align: 'center' })

  doc.setFontSize(12.5)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(70, 70, 70)
  doc.text(
    `Donneur de groupe sanguin ${profil.groupe}, a effectué ${profil.nombreDons} don(s) de sang`,
    width / 2, 99, { align: 'center' }
  )
  doc.text(
    `et a contribué à sauver environ ${profil.viesAidees} vie(s) au Burkina Faso.`,
    width / 2, 106, { align: 'center' }
  )

  // Badges obtenus
  const earned = badges.filter((b) => b.earned).map((b) => b.label).join('   •   ')
  if (earned) {
    doc.setFontSize(10.5)
    doc.setTextColor(183, 149, 11)
    doc.setFont('helvetica', 'bold')
    doc.text('DISTINCTIONS', width / 2, 118, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(90, 90, 90)
    doc.text(earned, width / 2, 124, { align: 'center', maxWidth: width - 50 })
  }

  // Cachet circulaire "officiel" en bas à droite
  const sealX = width - 42
  const sealY = height - 34
  doc.setDrawColor(30, 132, 73)
  doc.setLineWidth(0.8)
  doc.circle(sealX, sealY, 16, 'S')
  doc.setDrawColor(30, 132, 73)
  doc.setLineWidth(0.3)
  doc.circle(sealX, sealY, 13, 'S')
  doc.setFontSize(7.5)
  doc.setTextColor(30, 132, 73)
  doc.setFont('helvetica', 'bold')
  doc.text('FASO DJOLI NAFA', sealX, sealY - 1, { align: 'center' })
  doc.setFontSize(6.5)
  doc.text('CERTIFIÉ', sealX, sealY + 4, { align: 'center' })

  // Signature / date à gauche
  const dateStr = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  doc.setFontSize(9.5)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(110, 110, 110)
  doc.text(`Délivré le ${dateStr}`, 30, height - 30)
  doc.setDrawColor(180, 180, 180)
  doc.setLineWidth(0.3)
  doc.line(25, height - 22, 85, height - 22)
  doc.setFontSize(8.5)
  doc.text("L'équipe Faso Djoli Nafa", 30, height - 18)

  doc.save(`attestation-${profil.nom.replace(/\s+/g, '-').toLowerCase()}.pdf`)
}
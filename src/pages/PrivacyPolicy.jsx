import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import TopBar from '../components/TopBar'
import PageHeader from '../components/PageHeader'

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h2 className="font-bold text-ink text-sm mb-2">{title}</h2>
      <p className="text-sm text-gray-600 leading-relaxed">{children}</p>
    </div>
  )
}

function PrivacyPolicy() {
  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 md:px-8 pt-2 md:pt-10 pb-6">
      <TopBar />
      <PageHeader icon={ShieldCheck} title="Politique de confidentialité" subtitle="Dernière mise à jour : août 2026" />

      <Section title="Quelles données collectons-nous ?">
        Lors de ton inscription comme donneur, nous collectons ton nom, ton numéro de téléphone,
        ton groupe sanguin, ta ville/quartier et la date de ton dernier don. Ce sont les informations
        strictement nécessaires pour te mettre en relation avec un hôpital en cas de besoin compatible.
      </Section>

      <Section title="Pourquoi collectons-nous ces données ?">
        Ton groupe sanguin et ta localisation nous permettent d'identifier automatiquement les donneurs
        compatibles et disponibles lorsqu'un hôpital publie un besoin urgent. Ton téléphone est utilisé
        uniquement pour t'envoyer une alerte (notification ou SMS) dans ce cadre.
      </Section>

      <Section title="Qui a accès à mes données ?">
        Ton groupe sanguin, ta ville et ton statut d'éligibilité peuvent être visibles par les hôpitaux
        partenaires validés sur la plateforme, uniquement lorsqu'un besoin correspond à ton profil.
        Ton numéro de téléphone n'est jamais partagé publiquement ni vendu à des tiers.
      </Section>

      <Section title="Combien de temps gardons-nous tes données ?">
        Tes données sont conservées tant que ton compte est actif. Tu peux demander leur suppression
        à tout moment en nous contactant, ou directement depuis ton profil une fois cette fonctionnalité
        disponible.
      </Section>

      <Section title="Tes droits">
        Tu peux à tout moment consulter, corriger ou demander la suppression de tes données personnelles.
        Ton consentement à l'inscription peut être retiré à tout moment, ce qui entraînera la suppression
        de ton profil donneur.
      </Section>

      <Section title="Contact">
        Pour toute question concernant tes données, contacte l'équipe Faso Djoli Nafa via les
        coordonnées disponibles sur notre page d'accueil.
      </Section>

      <Link to="/inscription" className="text-blood font-semibold text-sm">
        ← Retour à l'inscription
      </Link>
    </div>
  )
}

export default PrivacyPolicy
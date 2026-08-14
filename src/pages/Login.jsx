import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn, ArrowLeft } from 'lucide-react'
import TopBar from '../components/TopBar'
import PageHeader from '../components/PageHeader'
import Input from '../components/Input'
import OtpInput from '../components/OtpInput'
import Button from '../components/Button'
import { sendOtp, verifyOtp } from '../services/api'

function Login() {
  const [step, setStep] = useState("phone") // "phone" | "otp"
  const [telephone, setTelephone] = useState("")
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSendCode = async (e) => {
    e.preventDefault()
    setLoading(true)
    await sendOtp(telephone)
    setLoading(false)
    setStep("otp")
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const res = await verifyOtp(telephone, code)
    setLoading(false)
    if (res.success) {
      navigate("/")
    } else {
      setError(res.error || "Code incorrect")
    }
  }

  return (
    <div className="max-w-md mx-auto md:mt-10 px-6 pt-2 pb-6">
      <TopBar />
      <PageHeader icon={LogIn} title="Connexion" subtitle={step === "phone" ? "Entre ton numéro pour recevoir un code." : `Code envoyé au ${telephone}`} />

      {step === "phone" && (
        <form onSubmit={handleSendCode} className="flex flex-col gap-4">
          <Input
            label="Téléphone"
            type="tel"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            placeholder="Ex: 70 12 34 56"
            required
          />
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Envoi..." : "Recevoir le code"}
          </Button>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={handleVerify} className="flex flex-col gap-5">
          <OtpInput value={code} onChange={setCode} length={4} />

          {error && <p className="text-blood text-xs font-medium text-center">{error}</p>}

          <Button type="submit" variant="primary" disabled={loading || code.length < 4}>
            {loading ? "Vérification..." : "Valider le code"}
          </Button>

          <button
            type="button"
            onClick={() => { setStep("phone"); setCode(""); setError("") }}
            className="flex items-center justify-center gap-1.5 text-sm text-gray-500"
          >
            <ArrowLeft size={14} /> Changer de numéro
          </button>
        </form>
      )}

      {step === "phone" && (
        <p className="text-sm text-gray-500 mt-6 text-center">
          Pas encore inscrit ? <Link to="/inscription" className="text-blood font-semibold">Devenir donneur</Link>
        </p>
      )}
    </div>
  )
}

export default Login
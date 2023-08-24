import './styles.scss'
import { useState } from 'react'
import { SyntheticEvent } from 'react'
import { useCampaigns } from '../../contexts/campaigns/useCampaigns'
import { Props } from './types'

const DonationForm = ({ campaignIndex }: Props) => {
  const [donation, setDonation] = useState<number>()
  const [error, setError] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const campaigns = useCampaigns()

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    if (Number(donation) < 1 || !donation) {
      setError("O valor enviado deve ser maior ou igual a 1.")
      return
    } else{
      setError("")
    }

    setMessage("Continue a transação a partir do MetaMask e aguarde alguns segundos")
    const newDonation = await campaigns.donate(campaignIndex, donation)
    if (newDonation) {
      setMessage("Obrigado por contribuir!")
    } else {
      setMessage("")
      setError("Houve um erro na transação. Tente novamente")
    }
  }

  return (
    <form className='donation' onSubmit={handleSubmit}>
      <h1 className='donation__title'>
        Doação
      </h1>
      <div className='donation__item'>
        <label className='donation__label' htmlFor='value'>
          Quanto deseja doar?
        </label>
        <div className='donation__value-container'>
          <input
            type='number'
            id='value'
            className='donation__input'
            value={donation}
            onChange={e => setDonation(Number(e.target.value))}
            step={0.1}
            placeholder='Insira o valor em Wei'
          />
        </div>
        <input type='submit' className='donation__submit' />
      </div>
      <h1 className='error'>{error}</h1>
      <h1 className='message'>{message}</h1>
    </form>
  )
}

export default DonationForm
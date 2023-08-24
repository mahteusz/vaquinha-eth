import './styles.scss'
import { useState } from 'react'
import { Props } from './types'
import { SyntheticEvent } from 'react'
import { useCampaigns } from '../../contexts/campaigns/useCampaigns'

const CampaignForm = ({ }: Props) => {
  const [owner, setOwner] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [imagePath, setImagePath] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [goal, setGoal] = useState<string>("1")

  const [error, setError] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const campaigns = useCampaigns()

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()

    if (!owner || !title || !imagePath || !description || !goal) {
      setError("Por favor, preencha todos os campos")
      return
    }

    if(Number(goal) <= 0) {
      setError("A meta deve ser maior que 0")
      return
    }

    setMessage("Continue a transação a partir do MetaMask e aguarde alguns segundos")
    setError('')
    const newCampaign = await campaigns.createCampaign(
      owner,
      title,
      description,
      BigInt(goal),
      imagePath
    )

    if (newCampaign) {
      setMessage('Vaquinha criada com sucesso!')
      setError('')
    } else {
      setMessage('')
      setError("Erro na criação da Vaquinha")
    }
  }

  return (
    <main className='campaign-form'>
      <form className='campaign-form__form' onSubmit={handleSubmit}>
        <h1 className='campaign-form__form-title'>
          Criar uma nova Vaquinha
        </h1>
        <div className='campaign-form__form-item'>
          <label className='campaign-form__label' htmlFor='value'>
            Qual o endereço da carteira?
          </label>
          <input
            type='text'
            value={owner}
            onChange={e => setOwner(e.target.value)}
            className='campaign-form__input'
            step={0.1}
            placeholder='Carteira'
          />
        </div>

        <div className='campaign-form__form-item'>
          <label className='campaign-form__label' htmlFor='value'>
            Qual título da Vaquinha?
          </label>
          <input
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
            className='campaign-form__input'
            step={0.1}
            placeholder='Título da Vaquinha'
          />
        </div>

        <div className='campaign-form__form-item'>
          <label className='campaign-form__label' htmlFor='value'>
            Qual link para imagem capa da Vaquinha?
          </label>
          <input
            type='text'
            value={imagePath}
            onChange={e => setImagePath(e.target.value)}
            className='campaign-form__input'
            step={0.1}
            placeholder='Link para imagem'
          />
        </div>

        <div className='campaign-form__form-item'>
          <label className='campaign-form__label' htmlFor='value'>
            Qual a descrição da Vaquinha?
          </label>
          <textarea
            className='campaign-form__input'
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder='Descreva aqui a sua situação e o motivo de você estar criando essa vaquinha.'
            rows={8}
            cols={30}
          />
        </div>

        <div className='campaign-form__form-item'>
          <label className='campaign-form__label' htmlFor='value'>
            Qual a meta em Wei?
          </label>
          <input
            type='number'
            value={goal}
            onChange={e => setGoal(e.target.value)}
            className='campaign-form__input'
            step={10}
            placeholder='Carteira'
          />
        </div>
        <input type='submit' className='campaign-form__submit' />
      </form>

      <h1 className='error'>{error}</h1>
      <h1 className='message'>{message}</h1>
    </main>
  )
}

export default CampaignForm 
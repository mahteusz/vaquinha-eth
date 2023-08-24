import './styles.scss'
import { Props } from './types'

const CampaignContent = ({ title, imagePath, description, numberOfDonations }: Props) => {
  return (
    <main className='campaign-content'>
      <img src={imagePath} className='campaign-content__img' />
      <h1 className='campaign-content__title'>{title}</h1>
      <h2 className='campaign-content__donations'>{`Doações recebidas: ${numberOfDonations}`}</h2>
      <p className='campaign-content__description'>
        {description}
      </p>
    </main>
  )
}

export default CampaignContent
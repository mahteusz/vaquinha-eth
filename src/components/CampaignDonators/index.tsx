import './styles.scss'
import { Props } from './types'

const CampaignDonators = ({ donators }: Props) => {
  return (
    <section className='campaign-donators'>
      {
        !donators.length ?
          <h1 className='campaign-donators__title'>
            Nenhum doador até o momento.
          </h1>
          :
          <h1 className='campaign-donators__title'>
            As seguintes carteiras já doaram:
          </h1>
      }
      {
        donators.map((donator, index) => {
          return (
            <span className='campaign-donators__wallet' key={index}>
              {donator}
            </span>
          )
        })
      }
    </section>
  )
}

export default CampaignDonators
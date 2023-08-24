import './styles.scss'
import { Props } from './types'

const CampaignData = ({ current, goal, numberOfDonators, donate }: Props) => {
  return (
    <section className='campaign-data'>
      <div className='campaign-data__progress-bar-container'>
        <span className='campaign-data__progress-bar-current'>
          {(current / goal) * 100}%
        </span>
        <div className='campaign-data__progress-bar'>
          <div
            className='campaigns__card-bar'
            style={{ width: `${(current / goal) * 100}%` }}
          >
          </div>
        </div>
      </div>
      <div className='campaign-data__field'>
        <span className='campaign-data__field-name'>
          Arrecadado:
        </span>
        <span className='campaign-data__field-value'>
          {current} Wei
        </span>
      </div>

      <div className='campaign-data__field'>
        <span className='campaign-data__field-name'>
          Meta:
        </span>
        <span className='campaign-data__field-value'>
          { goal } Wei
        </span>
      </div>

      <div className='campaign-data__field'>
        <span className='campaign-data__field-name'>
          Apoiadores:
        </span>
        <span className='campaign-data__field-value'>
          { numberOfDonators }
        </span>
      </div>

      <button className='campaign-data__donate' onClick={donate}>
        Doe agora
      </button>
    </section >
  )
}

export default CampaignData
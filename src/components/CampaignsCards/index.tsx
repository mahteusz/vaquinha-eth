import './styles.scss'
import { CampaignCardProps } from './types'
import { useCampaigns } from '../../contexts/campaigns/useCampaigns'
import { useNavigate } from 'react-router-dom'

const CampaignsCards = () => {

  const campaignsData = useCampaigns()

  return (
    <>
      <h1 className='title'>Colabore com alguma Vaquinha</h1>
      <main className='campaigns'>
        {
          campaignsData.loading ? <span>Loading...</span> :
            campaignsData.campaigns.map((campaign, index) => {
              return (
                <CampaignCard
                  title={campaign.title}
                  current={campaign.current}
                  goal={campaign.goal}
                  imagePath={campaign.imagePath}
                  numberOfDonations={campaign.donations.length}
                  key={index}
                  id={index}
                />
              )
            })
        }
      </main>
    </>
  )
}

const CampaignCard = ({ id, title, current, goal, imagePath, numberOfDonations }: CampaignCardProps) => {
  
  const navigate = useNavigate()
  
  return (
    <article className='campaigns__card' onClick={() => navigate(`campaign/${id}`)}>
      <img className='campaigns__card-image' src={imagePath} />
      <h1 className='campaigns__card-title'> {title}</h1>
      <div className='campaigns__card-progress-bar-container'>
        <span className='campaigns__card-progress-bar-current'>
          {(current / goal) * 100}%
        </span>
        <div className='campaigns__card-progress-bar'>
          <div
            className='campaigns__card-bar'
            style={{ width: `${(current / goal) * 100}%` }}
          >
          </div>
        </div>
      </div>
      <h2 className='campaigns__card-donations'>{numberOfDonations} doações recebidas</h2>
    </article>
  )
}

export default CampaignsCards
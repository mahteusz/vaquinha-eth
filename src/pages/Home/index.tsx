import './styles.scss'
import { CampaignsCards, Header } from '../../components'

const Home = () => {
  return (
    <div className='home'>
      <Header />
      <CampaignsCards />
    </div>
  )
}

export default Home
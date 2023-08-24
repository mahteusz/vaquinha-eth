import { Header, CampaignForm } from "../../components"
import './styles.scss'

const CreateCampaign = () => {
  return (
    <>
      <Header />
      <div className="create-campaign">
        <CampaignForm />
      </div>
    </>
  )
}

export default CreateCampaign
import './styles.scss'
import { useEffect, useState } from 'react'
import { CampaignContent, CampaignData, Header, CampaignDonators, Modal, DonationForm } from "../../components";
import { useCampaigns } from '../../contexts/campaigns/useCampaigns';
import { useParams, useNavigate } from 'react-router-dom'

const Campaign = () => {
  const [campaignId, setCampaignId] = useState<number>()
  const [donationModalOpen, setDonationModalOpen] = useState<boolean>(false)

  const campaignData = useCampaigns()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) {
      navigate("/")
    } else {
      const numberId = Number(id)
      if (numberId >= campaignData.campaigns.length) {
        navigate("/")
      } else {
        setCampaignId(numberId)
      }
    }
  }, [])

  const removeDuplicates = (arr: string[]) => {
    const unique = new Set(arr)
    return [...unique]
  }

  return (
    <>
      <Header />
      {campaignId !== undefined &&
        <div className='campaign'>
          <div className='campaign__container'>
            <CampaignData
              current={campaignData.campaigns[campaignId].current}
              goal={Number(campaignData.campaigns[campaignId].goal)}
              numberOfDonators={removeDuplicates(campaignData.campaigns[campaignId].donators).length}
              donate={() => setDonationModalOpen(true)}
            />
            <div className='column'>
              <CampaignContent
                title={campaignData.campaigns[campaignId].title}
                description={campaignData.campaigns[campaignId].description}
                imagePath={campaignData.campaigns[campaignId].imagePath}
                numberOfDonations={campaignData?.campaigns[campaignId].donations.length}
              />
              <CampaignDonators
                donators={removeDuplicates(campaignData.campaigns[campaignId].donators)}
              />
            </div>
          </div>
          <Modal
            children={<DonationForm campaignIndex={campaignId} />}
            open={donationModalOpen}
            onClose={() => setDonationModalOpen(false)}
          />
        </div>
      }
    </>
  )
}

export default Campaign
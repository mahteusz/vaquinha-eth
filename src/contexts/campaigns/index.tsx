import { useState, useEffect, createContext } from 'react'
import { Campaign, CampaignContextData, CampaignsProviderData } from './types'
import { useWeb3 } from '../web3/useWeb3'

export const CampaignsContext = createContext<CampaignContextData>({} as CampaignContextData)

export const CampaignsProvider = ({ children }: CampaignsProviderData) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const web3Data = useWeb3()

  useEffect(() => {
    getCampaigns()
  }, [])

  const createCampaign = async (owner: string, title: string, description: string, goal: BigInt, imagePath: string) => {
    try {
      await web3Data.contract.methods.createCampaign(
        owner,
        title,
        description,
        goal,
        imagePath
      ).send()

      const allCampaigns: [] = await web3Data.contract.methods.getCampaigns().call()
      const createdCampaign = allCampaigns[allCampaigns.length-1]
        
      setCampaigns([...campaigns, createdCampaign])
      return true
    } catch (err) {
      console.warn(err)
      return false
    }
  }

  const donate = async (campaignIndex: number, value: number) => {
    try {
    const donation = await web3Data.contract.methods.donate(campaignIndex).send({ value })
    return donation.status
    } catch(err) {
      console.warn(err)
      return false;
    }
  }

  const getCampaigns = async () => {
    try {
      const foundCampaigns: [] = await web3Data.contract.methods.getCampaigns().call()
      const formattedCampaigns = formatCampaigns(foundCampaigns)
      setCampaigns(formattedCampaigns)
    } catch (err) {
      console.warn(err)
    } finally {
      setLoading(false)
    }
  }

  const formatCampaigns = (campaigns: []) => {
    const formatted: Campaign[] = []
    campaigns.forEach(campaign => {
      formatted.push(
        {
          owner: campaign[0], title: campaign[1], description: campaign[2],
          imagePath: campaign[3], goal: campaign[4], current: campaign[5],
          startedIn: campaign[6], donators: campaign[7], donations: campaign[8]
        }
      )
    })

    return formatted
  }

  return (
    <CampaignsContext.Provider value={{ campaigns, loading, createCampaign, donate }}>
      {loading ? null : children}
    </CampaignsContext.Provider>
  )
}
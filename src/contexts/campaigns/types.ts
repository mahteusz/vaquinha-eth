type Campaign = {
  owner: string,
  title: string,
  description: string,
  imagePath: string,
  goal: BigInt,
  current: number,
  startedIn: number,
  donators: string[],
  donations: number[]
}

type CampaignContextData = {
  campaigns: Campaign[],
  createCampaign(owner: string, title: string, description: string, goal: BigInt, imagePath: string): Promise<boolean>,
  donate(campaignIndex:number, value: number): Promise<boolean>,
  loading: boolean,
}

type CampaignsProviderData = {
  children: React.ReactNode
}

export { type Campaign, type CampaignContextData, type CampaignsProviderData }
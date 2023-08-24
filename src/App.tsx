
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CampaignsProvider } from './contexts/campaigns'
import { Web3Provider } from './contexts/web3'
import { Campaign, CreateCampaign, Home } from './pages'

function App() {

  return (
    <Web3Provider>
      <CampaignsProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/campaign/:id' element={<Campaign />} />
            <Route path='/create' element={<CreateCampaign />} />
            <Route path='*' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </CampaignsProvider>
    </Web3Provider>
  )
}

export default App

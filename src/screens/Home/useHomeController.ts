import { useState } from 'react'
import { ETabs, TABS } from '../../const/token'

export function useHomeController() {
  const [activeTab, setActiveTab] = useState(TABS[0])

  return {
    activeTab,
    setActiveTab,
    isActiveBasic: activeTab === ETabs.BASIC_CONTRACT,
    isActiveAlphaToken: activeTab === ETabs.ALPHA_TOKEN_TAB,
    isActiveBetaToken: activeTab === ETabs.BETA_TOKEN_TAB,
    isActivePermitSwap: activeTab === ETabs.PERMIT_SWAP_CONTRACT
  }
}

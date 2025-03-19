import React from 'react'
import { ETabs } from '../../const/token'
import { Tab, TabBarContainer } from './styles'

interface TabBarSwitcherProps {
  activeTab: ETabs
  tabs: ETabs[]
  onChangeTab: (tab: ETabs) => void
}

export const TabBarSwitcher: React.FC<TabBarSwitcherProps> = ({ activeTab, tabs, onChangeTab }) => {
  return (
    <TabBarContainer>
      {tabs.map((tab) => {
        const onClick = () => {
          onChangeTab(tab)
        }

        return (
          <Tab key={tab} isActive={tab === activeTab} onClick={onClick}>
            {tab}
          </Tab>
        )
      })}
    </TabBarContainer>
  )
}

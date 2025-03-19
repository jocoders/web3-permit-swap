import { Body, Container, ContentContainer } from './styles'

import { AlphaToken } from '../../components/AlphaToken'
import { BetaToken } from '../../components/BetaToken'
import { BaseContract } from '../../components/BaseContract'
import { Col, Spacer } from '../../components/Basic'
import { Metamask } from '../../components/Metamask'
import { TabBarSwitcher } from '../../components/TabbarSwitcher'
import { TABS } from '../../const/token'
import { useHomeController } from './useHomeController'
import { PermitSwap } from '../../components/PermitSwap'

export function HomeScreen() {
  const { activeTab, setActiveTab, isActiveBasic, isActiveAlphaToken, isActiveBetaToken, isActivePermitSwap } =
    useHomeController()

  return (
    <Body>
      <Container>
        <TabBarSwitcher activeTab={activeTab} tabs={TABS} onChangeTab={setActiveTab} />
        <Spacer height={40} />
        <ContentContainer>
          <Col>
            {isActiveBasic && <BaseContract />}
            {isActiveAlphaToken && <AlphaToken />}
            {isActiveBetaToken && <BetaToken />}
            {isActivePermitSwap && <PermitSwap />}
          </Col>
          <Metamask />
        </ContentContainer>
      </Container>
    </Body>
  )
}

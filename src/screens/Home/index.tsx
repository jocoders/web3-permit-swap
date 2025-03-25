import { Body, Container, ContentContainer } from './styles'

import { AlphaToken } from '../../components/AlphaToken'
import { BaseContract } from '../../components/BaseContract'
import { Col, Spacer } from '../../components/Basic'
import { BetaToken } from '../../components/BetaToken'
import { Metamask } from '../../components/Metamask'
import { PermitSwap } from '../../components/PermitSwap'
import { TabBarSwitcher } from '../../components/TabbarSwitcher'
import { TABS } from '../../const/token'
import { useHomeController } from './useHomeController'

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
          {!isActivePermitSwap && <Metamask />}
        </ContentContainer>
      </Container>
    </Body>
  )
}

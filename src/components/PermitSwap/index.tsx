import permitSwapLogo from '../../../public/permit.webp'
import { Header, Image, Row, Spacer, Text } from '../Basic'

import { usePermitSwapController as useController } from './controller'
import { Container } from './styles'

export const PermitSwap = () => {
  const {} = useController()

  return (
    <Container>
      <Row>
        <Image source={permitSwapLogo} alt="Permit Swap Logo" />
        <Header text="Permit Swap" />
      </Row>
      <Spacer height={10} />
      <Text>{'Swap your Alpha and Beta tokens with out fee. We will do it for you.'}</Text>
      <Spacer height={4} />
      <Spacer height={10} />
    </Container>
  )
}

import permitSwapLogo from '../../../public/permit.webp'
import { Button, Col, Header, Image, Input, Picker, Row, Spacer, Text } from '../Basic'
import { Switcher } from '../Switcher'

import { usePermitSwapController as useController } from './controller'
import { OrderItem } from './OrderItem'
import {
  EmptyOrders,
  OrdersContainer,
  OrdersSection,
  RowButtons,
  RowErrorContainer,
  RowSwitcher,
  TextError,
  Wrapper
} from './styles'

export const PermitSwap = () => {
  const {
    amountSell,
    amountBuy,
    createOrder,
    clearOrders,
    deadline,
    executeOrders,
    nonce,
    orders,
    setNonce,
    setAmountSell,
    setAmountBuy,
    setDeadline,
    setTokenSell,
    setTokenBuy,
    signError,
    swapError,
    tokenSell,
    tokenBuy,
    switchers
  } = useController()

  return (
    <>
      <Wrapper>
        <Col>
          <Row>
            <Image source={permitSwapLogo} alt="Permit Swap Logo" />
            <Header text="Permit Swap" />
          </Row>
          <Spacer height={10} />
          <Text>{'Swap your Alpha and Beta tokens with out fee. We will do it for you.'}</Text>
          <Spacer height={10} />
          <RowSwitcher>
            <Switcher data={switchers} activeItem={tokenBuy} onChange={setTokenBuy} />
            <Text>{'Set token to buy 📉'}</Text>
            <Input
              value={amountBuy}
              placeholder={'Enter amount to buy'}
              onChange={(e) => setAmountBuy(e.target.value)}
            />
          </RowSwitcher>
          <Spacer height={10} />
          <RowSwitcher>
            <Switcher data={switchers} activeItem={tokenSell} onChange={setTokenSell} />
            <Text>{'Set token to sell 📈'}</Text>
            <Input
              value={amountSell}
              placeholder={'Enter amount to sell'}
              onChange={(e) => setAmountSell(e.target.value)}
            />
          </RowSwitcher>
          <Spacer height={10} />
          <Input value={nonce} placeholder={'Enter nonce'} onChange={(e) => setNonce(e.target.value)} />
          <Spacer height={10} />
          <Picker value={deadline} onChange={setDeadline} />
          <Spacer height={10} />
          <Button buttonType="primary" disabled={!amountSell || !amountBuy || !deadline} onClick={createOrder}>
            {'Send order'}
          </Button>
          {!!signError && <TextError>{`Error: ${signError}`}</TextError>}
          <Spacer height={20} />
          <RowErrorContainer>{!!swapError && <TextError>{`Error: ${swapError}`}</TextError>}</RowErrorContainer>
        </Col>

        <OrdersSection>
          <Header text="Active Orders" />
          <RowButtons>
            <Button buttonType="primary" isFullWidth disabled={orders?.length < 2} onClick={executeOrders}>
              {'Execute'}
            </Button>
            <Button buttonType="primary" isFullWidth onClick={clearOrders}>
              {'Clear'}
            </Button>
          </RowButtons>
          <Spacer height={10} />
          <OrdersContainer>
            {orders?.length > 0 ? (
              orders.map((item) => <OrderItem key={item.order.orderId} order={item.order} />)
            ) : (
              <EmptyOrders>
                <Image source={permitSwapLogo} alt="No orders" />
                <Text>No active orders</Text>
                <Text style={{ fontSize: 12, color: '#8890A4' }}>Create your first order to see it here</Text>
              </EmptyOrders>
            )}
          </OrdersContainer>
        </OrdersSection>
      </Wrapper>
    </>
  )
}

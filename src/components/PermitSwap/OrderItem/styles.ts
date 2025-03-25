// styles.ts
import styled from 'styled-components'

// ... существующие стили ...

export const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 400px;
  overflow-y: auto;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(5px);
`

export const OrderCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  gap: 8px;
`

export const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const OrderLabel = styled.span`
  color: #8890a4;
  font-size: 12px;
`

export const OrderValue = styled.span`
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
`

export const EmptyOrders = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  color: #8890a4;
  text-align: center;
  gap: 10px;
`

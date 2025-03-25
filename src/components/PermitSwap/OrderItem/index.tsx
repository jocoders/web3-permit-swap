// components/OrderCard.tsx
import { TOrder } from '../controller'
import { OrderCard, OrderInfo, OrderLabel, OrderValue } from './styles'

interface OrderCardProps {
  order: TOrder
}

export const OrderItem: React.FC<OrderCardProps> = ({ order }) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString()
  }

  return (
    <OrderCard>
      <OrderInfo>
        <OrderLabel>Order ID:</OrderLabel>
        <OrderValue>#{order.orderId}</OrderValue>
      </OrderInfo>
      <OrderInfo>
        <OrderLabel>Owner:</OrderLabel>
        <OrderValue>
          {order.owner.substring(0, 6)}...{order.owner.substring(38)}
        </OrderValue>
      </OrderInfo>
      <OrderInfo>
        <OrderLabel>Sell Token:</OrderLabel>
        <OrderValue>
          {order.tokenSell.substring(0, 6)}...{order.tokenSell.substring(38)}
        </OrderValue>
      </OrderInfo>
      <OrderInfo>
        <OrderLabel>Buy Token:</OrderLabel>
        <OrderValue>
          {order.tokenBuy.substring(0, 6)}...{order.tokenBuy.substring(38)}
        </OrderValue>
      </OrderInfo>
      <OrderInfo>
        <OrderLabel>Amount Sell:</OrderLabel>
        <OrderValue>{order.amountSell}</OrderValue>
      </OrderInfo>
      <OrderInfo>
        <OrderLabel>Amount Buy:</OrderLabel>
        <OrderValue>{order.amountBuy}</OrderValue>
      </OrderInfo>
      <OrderInfo>
        <OrderLabel>Deadline:</OrderLabel>
        <OrderValue>{formatDate(order.deadline)}</OrderValue>
      </OrderInfo>
    </OrderCard>
  )
}

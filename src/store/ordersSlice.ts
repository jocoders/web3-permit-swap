// src/store/ordersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TOrderItem } from '../components/PermitSwap/controller'
import { TOrdersState } from './types'

const initialState: TOrdersState = {
  orders: [],
  orderId: 1
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<TOrderItem>) => {
      state.orders.push(action.payload)
    },
    removeOrders: (state, action: PayloadAction<number[]>) => {
      state.orders = state.orders.filter((order) => !action.payload.includes(order.order.orderId))
    },
    clearOrders: (state) => {
      state.orders = []
    },
    setOrderId: (state) => {
      state.orderId += 1
    }
  }
})

export const { addOrder, removeOrders, clearOrders, setOrderId } = ordersSlice.actions
export default ordersSlice.reducer

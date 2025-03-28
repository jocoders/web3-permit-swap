import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
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

export const OrdersSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(5px);
  min-height: 0;
  max-height: calc(100vh - 200px);
  margin-bottom: 60px;
  min-width: 350px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;

    &:hover {
      background: rgba(255, 255, 255, 0.4);
    }
  }
`

export const OrderWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

export const RowSwitcher = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

export const RowErrorContainer = styled.div`
  width: 300px;
`

export const RowButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
`

export const SuccessMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 8px;
  margin: 20px 0;
`

export const SuccessText = styled.div`
  color: #4caf50;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`

export const TextError = styled.text`
  color: red;
  font-weight: bold;
  margin-left: 10px;
`

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 40px;
  padding: 20px;
  box-sizing: border-box;
  min-height: 0;
`

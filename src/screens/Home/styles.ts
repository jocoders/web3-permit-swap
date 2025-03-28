import styled from 'styled-components'
import backgroundImage from '../../../public/backgroundImage.png'

export const Body = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
`

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 50px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

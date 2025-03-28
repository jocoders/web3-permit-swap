// src/components/Basic/Spinner/index.tsx
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const SpinnerWrapper = styled.div<{ size?: number }>`
  width: ${(props) => props.size || 24}px;
  height: ${(props) => props.size || 24}px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

interface SpinnerProps {
  size?: number
}

export const Spinner = ({ size }: SpinnerProps) => {
  return <SpinnerWrapper size={size} />
}

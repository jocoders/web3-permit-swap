import styled, { css } from 'styled-components'
import { COLORS } from '../../../theme/colors'
import { ButtonType } from './Button'

interface ButtonProps {
  buttonType?: ButtonType
  isFullWidth?: boolean
}

const customShouldForwardProp = (prop: string) => prop !== 'buttonType'

export const BaseButton = styled('button').withConfig({
  shouldForwardProp: customShouldForwardProp
})<ButtonProps>`
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : 'auto')};

  ${(props) =>
    props.buttonType === 'primary' &&
    css`
      background-color: ${COLORS.primary};

      &:hover {
        background-color: ${COLORS.bg_primary};
      }
    `}

  ${(props) =>
    props.buttonType === 'secondary' &&
    css`
      background-color: ${COLORS.secondary};

      &:hover {
        background-color: ${COLORS.bg_secondary};
      }
    `}
`

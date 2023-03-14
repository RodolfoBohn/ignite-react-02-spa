import styled from 'styled-components'

export const Wrapper = styled.main`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h1 {
    font-size: 1.5rem;
    line-height: 1.6;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const HistoryTableWrapper = styled.div`
  flex: 1;
  overflow: auto;

  table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;

    th {
      background: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        padding-left: 1.5rem;
        border-top-left-radius: 8px;
      }

      &:last-child {
        padding-right: 1.5rem;
        border-top-right-radius: 8px;
      }
    }

    td {
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;
      color: ${(props) => props.theme['gray-300']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      background: ${(props) => props.theme['gray-700']};

      &:first-child {
        padding-left: 1.5rem;
        width: 50%;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

const STATUS_COLORS = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]};
    border-radius: 50%;
  }
`

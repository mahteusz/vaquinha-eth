import { MouseEventHandler } from 'react'
type Props = {
  current: number,
  goal: number,
  numberOfDonators: number,
  donate: MouseEventHandler<HTMLButtonElement>
}

export { type Props }
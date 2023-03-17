import { differenceInSeconds } from 'date-fns'
import { useEffect, useState } from 'react'
import { useCycleContext } from '../../../../context/CycleContext'
import { CountdownWrapper, Separator } from './styles'

export const CountDown = () => {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)
  const { activeCycle, finishedCycle } = useCycleContext()

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutes = Math.floor(currentSeconds / 60)
    .toString()
    .padStart(2, '0')

  const seconds = (currentSeconds % 60).toString().padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      if (currentSeconds > 0) {
        interval = setInterval(() => {
          setAmountSecondsPassed(
            differenceInSeconds(new Date(), activeCycle?.startDate),
          )
        }, 1000)
      } else {
        finishedCycle()
      }
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, currentSeconds, finishedCycle])

  return (
    <CountdownWrapper>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownWrapper>
  )
}
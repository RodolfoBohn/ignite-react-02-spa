import { Play, HandPalm } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'

import {
  CountdownWrapper,
  MinutesAmountInput,
  Separator,
  StartButton,
  StopButton,
  TaskInput,
  Wrapper,
} from './styles'
import { useEffect, useState } from 'react'

const pomodoroFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

type PomodoroFormProps = zod.infer<typeof pomodoroFormValidationSchema>

interface CycleProps {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export const Home = () => {
  const [cycles, setCycles] = useState<CycleProps[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  const { register, handleSubmit, reset, watch } = useForm<PomodoroFormProps>({
    resolver: zodResolver(pomodoroFormValidationSchema),
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })

  function onPomodoroFormSubmit(data: PomodoroFormProps) {
    const startDate = new Date()
    const id = startDate.getTime().toString()

    const newCycle: CycleProps = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate,
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    reset()
  }

  function handleInterruptsCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedDate: new Date(),
          }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  const isPomodoroFormSubmitButtonDisabled = !watch('task')

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

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
        setCycles((state) =>
          state.map((cycle) => {
            if (cycle.id === activeCycleId) {
              return {
                ...cycle,
                finishedDate: new Date(),
              }
            } else {
              return cycle
            }
          }),
        )

        setActiveCycleId(null)
      }
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, activeCycleId, currentSeconds])

  return (
    <Wrapper>
      <form id="pomodoroForm" onSubmit={handleSubmit(onPomodoroFormSubmit)}>
        <label htmlFor="task">Vou trabalhar em </label>
        <TaskInput
          id="task"
          list="task-suggestions"
          placeholder="Dê um nome para seu projeto"
          disabled={!!activeCycle}
          {...register('task')}
        />

        <datalist id="task-suggestions">
          <option value={'projeto 1'} />
          <option value={'projeto 2'} />
          <option value={'projeto 3'} />
        </datalist>

        <label htmlFor="minutesAmount"> durante </label>
        <MinutesAmountInput
          type={'number'}
          id="minutesAmount"
          placeholder="00"
          step={5}
          max={60}
          min={1}
          disabled={!!activeCycle}
          {...register('minutesAmount', { valueAsNumber: true })}
        />
        <span>minutos.</span>
      </form>

      <CountdownWrapper>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator>:</Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
      </CountdownWrapper>

      {activeCycle ? (
        <StopButton type="button" onClick={handleInterruptsCycle}>
          <HandPalm size={24} />
          Interromper
        </StopButton>
      ) : (
        <StartButton
          type="submit"
          form="pomodoroForm"
          disabled={isPomodoroFormSubmitButtonDisabled}
        >
          <Play size={24} />
          Começar
        </StartButton>
      )}
    </Wrapper>
  )
}

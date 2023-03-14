import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  CountdownWrapper,
  MinutesAmountInput,
  Separator,
  StartButton,
  TaskInput,
  Wrapper,
} from './styles'

export const Home = () => {
  const pomodoroFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
      .number()
      .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
      .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
  })

  type PomodoroFormProps = zod.infer<typeof pomodoroFormValidationSchema>

  const { register, handleSubmit, reset } = useForm<PomodoroFormProps>({
    resolver: zodResolver(pomodoroFormValidationSchema),
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })

  function onPomodoroFormSubmit(data: PomodoroFormProps) {
    console.log(data)
    reset()
  }

  return (
    <Wrapper>
      <form id="pomodoroForm" onSubmit={handleSubmit(onPomodoroFormSubmit)}>
        <label htmlFor="task">Vou trabalhar em </label>
        <TaskInput
          id="task"
          list="task-suggestions"
          placeholder="Dê um nome para seu projeto"
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
          min={5}
          {...register('minutesAmount', { valueAsNumber: true })}
        />
        <span>minutos.</span>
      </form>

      <CountdownWrapper>
        <span>0</span>
        <span>0</span>
        <Separator>:</Separator>
        <span>0</span>
        <span>0</span>
      </CountdownWrapper>

      <StartButton type="submit" form="pomodoroForm">
        <Play size={24} />
        Começar
      </StartButton>
    </Wrapper>
  )
}

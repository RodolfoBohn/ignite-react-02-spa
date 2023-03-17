import { Play, HandPalm } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { StartButton, StopButton, Wrapper } from './styles'
import { CountDown } from './components/Countdown'
import { CycleForm } from './components/CycleForm'
import { useCycleContext } from '../../context/CycleContext'

const pomodoroFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

export type PomodoroFormProps = zod.infer<typeof pomodoroFormValidationSchema>

export const Home = () => {
  const { activeCycle, interruptCycle } = useCycleContext()

  const newCycleForm = useForm<PomodoroFormProps>({
    resolver: zodResolver(pomodoroFormValidationSchema),
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })

  const { watch } = newCycleForm

  const isPomodoroFormSubmitButtonDisabled = !watch('task')

  return (
    <Wrapper>
      <FormProvider {...newCycleForm}>
        <CycleForm />
      </FormProvider>
      <CountDown />
      {activeCycle ? (
        <StopButton type="button" onClick={interruptCycle}>
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

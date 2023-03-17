import { useFormContext } from 'react-hook-form'
import { PomodoroFormProps } from '../..'
import { useCycleContext } from '../../../../context/CycleContext'
import { FormWrapper, TaskInput, MinutesAmountInput } from './styles'

export const CycleForm = () => {
  const { handleSubmit, register, reset } = useFormContext<PomodoroFormProps>()
  const { activeCycle, createNewCycle } = useCycleContext()

  function onCreateNewCycle(data: PomodoroFormProps) {
    createNewCycle(data)
    reset()
  }

  return (
    <FormWrapper id="pomodoroForm" onSubmit={handleSubmit(onCreateNewCycle)}>
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
        min={5}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormWrapper>
  )
}

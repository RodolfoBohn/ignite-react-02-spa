import { Play } from 'phosphor-react'

import {
  CountdownWrapper,
  MinutesAmountInput,
  Separator,
  StartButton,
  TaskInput,
  Wrapper,
} from './styles'

export const Home = () => {
  return (
    <Wrapper>
      <form id="pomodoroForm">
        <label htmlFor="task">Vou trabalhar em </label>
        <TaskInput
          id="task"
          list="task-suggestions"
          placeholder="Dê um nome para seu projeto"
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

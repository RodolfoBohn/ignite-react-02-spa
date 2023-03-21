import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  createNewCycleAction,
  finishCycleAction,
  interruptCycleAction,
} from '../reducers/cycles/actions'
import { cyclesReducer, CycleType } from '../reducers/cycles/reducer'

interface CreateCycleProps {
  task: string
  minutesAmount: number
}

interface CycleContextType {
  cycles: CycleType[]
  activeCycleId: string
  activeCycle: CycleType | undefined
  amountSecondsPassed: number
  createNewCycle: (data: CreateCycleProps) => void
  interruptCycle: () => void
  finishedCycle: () => void
  setSecondsPassed: (seconds: number) => void
}

const CycleContext = createContext({} as CycleContextType)

interface CycleProviderProps {
  children: ReactNode
}

export function CycleContextProvider({ children }: CycleProviderProps) {
  const [{ activeCycleId, cycles }, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    },
  )
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(() => {
    if (activeCycle) {
      console.log(activeCycle.startDate)
      console.log(new Date(activeCycle.startDate))
      console.log(
        'OPA:',
        differenceInSeconds(new Date(), new Date(activeCycle.startDate)),
      )
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })
  console.log(amountSecondsPassed)
  function createNewCycle(data: CreateCycleProps) {
    const startDate = new Date()
    const id = startDate.getTime().toString()

    const newCycle: CycleType = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate,
    }
    dispatch(createNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function interruptCycle() {
    dispatch(interruptCycleAction())
  }

  function finishedCycle() {
    console.log('Chamado')
    dispatch(finishCycleAction())
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }
  useEffect(() => {
    const stateJSON = JSON.stringify({ activeCycleId, cycles })

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [activeCycleId, cycles])

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycleId,
        activeCycle,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCycle,
        finishedCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}

export const useCycleContext = () => useContext(CycleContext)

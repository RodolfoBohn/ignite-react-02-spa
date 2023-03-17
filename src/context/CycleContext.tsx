import { createContext, ReactNode, useContext, useState } from 'react'

interface CreateCycleProps {
  task: string
  minutesAmount: number
}

interface CycleType {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleContextType {
  cycles: CycleType[]
  activeCycleId: string
  activeCycle: CycleType | undefined
  createNewCycle: (data: CreateCycleProps) => void
  interruptCycle: () => void
  finishedCycle: () => void
}

const CycleContext = createContext({} as CycleContextType)

interface CycleProviderProps {
  children: ReactNode
}

export function CycleContextProvider({ children }: CycleProviderProps) {
  const [cycles, setCycles] = useState<CycleType[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function createNewCycle(data: CreateCycleProps) {
    const startDate = new Date()
    const id = startDate.getTime().toString()

    const newCycle: CycleType = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate,
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    // reset()
  }

  function interruptCycle() {
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

  function finishedCycle() {
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

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycleId,
        activeCycle,
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

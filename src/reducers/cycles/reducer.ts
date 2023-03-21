import { produce } from 'immer'

import { CyclesActionsTypes } from './actions'

export interface CycleType {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleState {
  cycles: CycleType[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CycleState, action: any): CycleState {
  const currentCycleIndex = state.cycles.findIndex((cycle) => {
    return cycle.id === state.activeCycleId
  })
  switch (action.type) {
    case CyclesActionsTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.activeCycleId = action.payload.id
        draft.cycles.push(action.payload)
      })
    // return {
    //   ...state,
    //   cycles: [...state.cycles, action.payload],
    //   activeCycleId: action.payload.id,
    // }
    case CyclesActionsTypes.INTERRUPT_CURRENT_CYCLE:
      return produce(state, (draft) => {
        if (currentCycleIndex < 0) {
          return draft
        }
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
      })
    // return {
    //   ...state,
    //   cycles: state.cycles.map((cycle) => {
    //     if (cycle.id === state.activeCycleId) {
    //       return {
    //         ...cycle,
    //         interruptedDate: new Date(),
    //       }
    //     } else {
    //       return cycle
    //     }
    //   }),
    //   activeCycleId: null,
    // }
    case CyclesActionsTypes.FINISH_ACTIVE_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return {
              ...cycle,
              finishedDate: new Date(),
            }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }
    default:
      return state
  }
}

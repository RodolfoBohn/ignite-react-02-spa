import { CycleType } from './reducer'

/* eslint-disable no-unused-vars */
export enum CyclesActionsTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  FINISH_ACTIVE_CYCLE = 'FINISH_ACTIVE_CYCLE',
}

export function createNewCycleAction(cycle: CycleType) {
  return {
    type: CyclesActionsTypes.ADD_NEW_CYCLE,
    payload: cycle,
  }
}

export function interruptCycleAction() {
  return {
    type: CyclesActionsTypes.INTERRUPT_CURRENT_CYCLE,
  }
}

export function finishCycleAction() {
  return {
    type: CyclesActionsTypes.FINISH_ACTIVE_CYCLE,
  }
}

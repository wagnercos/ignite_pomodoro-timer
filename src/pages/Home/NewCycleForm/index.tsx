import { useContext } from 'react'
import { useFormContext } from 'react-hook-form' // Só funciona se usar com um Provider do useFormContext, como o FormProvider

import { CyclesContext } from '../../../contexts/CyclesContext'

import { FormContainer, TaskInput, MinutesAmountInput } from './styles'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        disabled={!!activeCycle}
        type="text"
        id="taks"
        placeholder="Dê um nome para o seu projeto"
        list="task-suggestions"
        {...register('task')}
      />
      <datalist id="task-suggestions">
        <option value="" />
      </datalist>

      <label htmlFor="minutes">durante</label>
      <MinutesAmountInput
        disabled={!!activeCycle}
        type="number"
        id="minutes"
        placeholder="00"
        step={5}
        min={1}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
    </FormContainer>
  )
}

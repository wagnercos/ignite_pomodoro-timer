import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { HandPalm, Play } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { NewCycleForm } from './NewCycleForm'
import { Countdown } from './Countdown'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { CyclesContext } from '../../contexts/CyclesContext'

// Validando o objeto
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa!').optional(),
  minutesAmount: zod.number().min(1).max(60),
})

type NewCycleFormDataType = zod.infer<typeof newCycleFormValidationSchema>

//* ***********************************************************************************************

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormDataType>({
    resolver: zodResolver(newCycleFormValidationSchema), // validação
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormDataType) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  //* ************************************************************************************************

  return (
    <HomeContainer>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.2 }}
      >
        <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />

          {!activeCycle ? (
            <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
              <Play size={24} />
              Começar
            </StartCountdownButton>
          ) : (
            <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
              <HandPalm size={24} />
              Interromper
            </StopCountdownButton>
          )}
        </form>
      </motion.div>
    </HomeContainer>
  )
}

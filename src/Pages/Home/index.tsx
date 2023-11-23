/* eslint-disable @typescript-eslint/no-explicit-any */
import { HandPalm, Play } from 'phosphor-react';
import { FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';

import {
    HomeContainer,
    StartCoutDownButton,
    StopCoutDownButton
} from './styles';
import { NewCycleForm } from './components/NewCycleForm';
import { CountDown } from './components/CountDown';
import { CyclesContext } from '../../Contexts/CyclesContexts';

/**
 * - Prop Drilling -> Quando a gente tem muitas propriedades apenas para comunicação entre componentes
 * - Context API -> Pertime compartilharmos informações entre varios compoentes ao mesmo tempo
*/

type NewCycleForm = zod.infer<typeof newCycleFormValidationSchema>

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Por favor informar um caracter'),
    MinutesAmountInput: zod.
        number().
        min(1, 'Ciclo precisa ser no minimo 5 minutos').
        max(60, 'Ciclo precisa ser no maximo 60 minutos'),
})

export function Home() {
    const { activeCycle, createNewCycle, interrupteCycle} = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleForm>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            MinutesAmountInput: 0,
        }
    });

    const {reset, handleSubmit, watch} = newCycleForm

    function handleCreateNewCycle(data: NewCycleForm) {
        createNewCycle(data)
        reset()
    }

    // diabled start button task
    const task = watch('task');
    const isDisableTask = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <CountDown />

                {activeCycle ? (
                    <StopCoutDownButton onClick={interrupteCycle} type="button">
                        <HandPalm size={24} />
                        INTERROMPER
                    </StopCoutDownButton>
                ) : (
                    <StartCoutDownButton disabled={isDisableTask} type="submit">
                        <Play size={24} />
                        INICIAR
                    </StartCoutDownButton>
                )}
            </form>
        </HomeContainer>
    )
}
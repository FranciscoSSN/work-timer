import { useContext } from "react";
import { FormConatiner, InputTask, MinutesAmountInput } from "./styles";

import { useFormContext } from 'react-hook-form';
import { CyclesContext } from "../../../../Contexts/CyclesContexts";

export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext)
    const { register } = useFormContext()

    return (
        <FormConatiner>
            <label htmlFor="task">Vou trabalhar em</label>
            <InputTask
                id="task"
                placeholder='Digite o nome da sua atividade.'
                disabled={!!activeCycle}
                {...register('task')}
            />

            <label htmlFor="MinutesAmountInput">durante</label>
            <MinutesAmountInput
                type='number'
                id="minutesAmount"
                placeholder='00'
                min={1}
                max={60}
                disabled={!!activeCycle}
                {...register('MinutesAmountInput', { valueAsNumber: true })}
            />

            <span>minutos.</span>
        </FormConatiner>
    )
}
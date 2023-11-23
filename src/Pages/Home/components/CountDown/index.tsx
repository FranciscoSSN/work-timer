import { useEffect, useContext } from "react";
import { CountDownContainer, SeparatorContainer } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../Contexts/CyclesContexts";


export function CountDown() {
    const { 
        activeCycle, 
        activeCycleId, 
        markCurrentCycleAsFinished, 
        amountSecondPassed, 
        setSecondsPassed 
    } = useContext(CyclesContext)


    const totalSeconds = activeCycle ? activeCycle.MinutesAmountInput * 60 : 0

    useEffect(() => {
        let interval: number

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                    new Date(),
                    new Date(activeCycle.startDate)
                )

                if (secondsDifference >= totalSeconds) {
                    markCurrentCycleAsFinished()
                    setSecondsPassed(totalSeconds)
                    clearInterval(interval)
                } else {
                    setSecondsPassed(secondsDifference)
                }
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }

    }, [activeCycle, totalSeconds, activeCycleId, setSecondsPassed])

    const currentPassed = activeCycle ? totalSeconds - amountSecondPassed : 0

    const minutesAmount = Math.floor(currentPassed / 60)
    const secondsAmount = currentPassed % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])

    return (
        <CountDownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <SeparatorContainer>:</SeparatorContainer>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountDownContainer>
    )
}
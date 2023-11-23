import { CyclesContext } from "../../Contexts/CyclesContexts";
import { HistoryContainer, HistoryList, StatusWorkContainer } from "./styles";
import { useContext } from 'react';
import { formatDistanceToNow } from 'date-fns';
import ptBR from "date-fns/locale/pt-BR";

export function History() {

    const { cycles } = useContext(CyclesContext)

    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map((cycle) => {
                            return (
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.MinutesAmountInput} minutos</td>
                                    <td>{formatDistanceToNow(new Date(cycle.startDate), {
                                        addSuffix: true,
                                        locale: ptBR,
                                    })}</td>
                                    <td>
                                        {cycle.fineshedDate && (
                                            <StatusWorkContainer statusColor="green">Concluído</StatusWorkContainer>
                                        )}

                                        {cycle.interrupteDate && (
                                            <StatusWorkContainer statusColor="red">Interrompido</StatusWorkContainer>
                                        )}

                                        {!cycle.fineshedDate && !cycle.interrupteDate && (
                                            <StatusWorkContainer statusColor="yellow">Em andamento</StatusWorkContainer>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}
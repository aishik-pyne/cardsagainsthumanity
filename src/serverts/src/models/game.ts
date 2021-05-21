import { Player } from "./player";

export interface Game {
    turn: number,
    cardzar: Player,
    question: string,
    answerChoices: Record<string, string[]>,
    answers: Record<string, string>

}
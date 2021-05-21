import { Player } from "./player";

export interface Game {
    turn: number,
    cardzar: Player,
    question: string,
    answerChoices: Map<string, string[]>,
    answers: Map<string, string>

}
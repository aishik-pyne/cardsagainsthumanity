import { Game } from "./game";
import { Player } from "./player";

export enum GameSpeed {
    Normal,
    Fast,
}
export enum RoomState {
    Waiting,
    Started,
    Ended,
}
export interface RoomSettings {
    max_players: number;
    game_speed: GameSpeed;
}

export const defaultRoomSettings: RoomSettings = {
    max_players: 4,
    game_speed: GameSpeed.Normal,
};
export interface Room {
    id: string;
    settings: RoomSettings;
    state: RoomState;
    players: Player[];
    admin: Player;
    game?: Game;
}

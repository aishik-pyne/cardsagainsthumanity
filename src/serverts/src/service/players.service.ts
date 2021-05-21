import { v4 as uuidv4 } from "uuid";
import { name as FakeName } from "faker";
import { Player } from "../models/player";
import { logger } from "../utils/logging";
const playerLogger = logger.child({ service: "Player" });

const players: Map<string, Player> = new Map<string, Player>();
export function createPlayer(name = null): Player {
    const playerId = generatePlayerId();
    const playerName = name != null ? name : generateFakePlayerName();
    const player: Player = {
        id: playerId,
        name: playerName,
    };
    players.set(playerId, player);

    playerLogger.info(`Player Created ${player.id} Name ${player.name}`);
    return player;
}
export function setPlayerName(playerId, name): Player {
    const player = players.get(playerId);
    player.name = name;
    playerLogger.info(`Player Updated ${player.id} Name ${player.name}`);
    return player;
}
export function getPlayer(playerId): Player {
    return players.get(playerId);
}
export function deletePlayer(playerId): void {
    const player: Player = players.get(playerId);
    players.delete(player.id);
    playerLogger.info(`Player Deleted ${playerId} Name ${player.name}`);
}

// Private Functions
function generateFakePlayerName() {
    return FakeName.firstName();
}
function generatePlayerId() {
    let myuuid = uuidv4();
    return myuuid;
}

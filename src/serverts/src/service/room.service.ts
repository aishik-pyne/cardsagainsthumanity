import { defaultRoomSettings, Room, RoomState } from "../models/room";
import { getAnswers, getQuestions } from "./card.service";
import { getPlayer } from "./players.service";
import { logger } from "../utils/logging";
import { Player } from "../models/player";
const roomLogger = logger.child({ service: "Room" });
const gameLogger = logger.child({ service: "Game" });
const roomsList: Map<string, Room> = new Map<string, Room>();
export function getRoom(roomId): Room {
    // roomLogger.info(`Get Room ${roomId}`);
    const room = roomsList.get(roomId);

    return room;
}
export function createRoom(player: Player): Room {
    const room: Room = {
        id: generateRoomId(),
        players: [player],
        admin: player,
        settings: defaultRoomSettings,
        state: RoomState.Waiting,
    };
    roomsList.set(room.id, room);

    roomLogger.info(`Created Room ${room.id}`);
    return room;
}
export function joinRoom(roomId: string, player: Player): Room {
    if (!roomsList.has(roomId)) {
        throw new Error("Room doesn't exist");
    }
    const room = roomsList.get(roomId);
    if (room.players.length == room.settings.max_players - 1) {
        throw new Error("Room is full");
    }
    room.players.push(player);
    roomLogger.info(`Joined Room ${roomId} Player ${player.id}`);
    return room;
}
export function leaveRoom(roomId: string, playerId) {
    // TODO: Add Null check
    // delete this.rooms[roomId].players[playerId];
    const room = roomsList.get(roomId);
    for (let i = 0; i < room.players.length; i++) {
        if (room.players[i].id == playerId) {
            room.players.splice(i, 1);
        }
    }
}
export function startGame(roomId) {
    const room: Room = roomsList.get(roomId);
    room.state = RoomState.Started;
    gameLogger.info("Game Started");
    nextTurn(room);

    return room;
}
export function nextTurn(room: Room) {
    if (room.game == null) {
        const answerChoices: Record<string, string[]> = {};
        room.players.forEach((player) => {
            answerChoices[player.id] = getAnswers(8);
        });
        room.game = {
            turn: 1,
            cardzar: room.admin,
            question: getQuestions(1)[0],
            answerChoices: answerChoices,
            answers: {},
        };
    } else {
        room.game.turn += 1;
        room.game.question = getQuestions(1)[0];

        // Replenish the cards
        room.players.forEach((player) => {
            if (player.id != room.game.cardzar.id) {
                room.game.answerChoices[player.id].push(getAnswers(1)[0]);
            }
        });

        // Rotate the Cardzar
        room.game.cardzar = room.players[(room.players.findIndex((p) => p.id == room.game.cardzar.id) + 1) % room.players.length];

        // Reset Answer Choices
        room.game.answers = {};
    }
    gameLogger.info(`Turn ${room.game.turn} Cardzar ${room.game.cardzar.name}`);
}
export function chooseAnswer(roomId: string, player: Player, answerIdx) {
    // Check player is not cardzar
    // Block action if card already chosen
    const room: Room = roomsList.get(roomId);
    if (room.state == RoomState.Started && player.id != room.game.cardzar.id && !(player.id in room.game.answers)) {
        const answer: string = room.game.answerChoices[player.id][answerIdx];
        room.game.answerChoices[player.id].splice(answerIdx, 1);
        room.game.answers[player.id] = answer;
    }
}
export function pickBestAnswer(roomId: string, player: Player, bestanswerPlayerIdx: string) {
    const room: Room = roomsList.get(roomId);
    if (
        room.state == RoomState.Started &&
        player.id == room.game.cardzar.id &&
        Object.keys(room.game.answers).length >= room.players.length -1
    ) {
        nextTurn(room);
        gameLogger.info(`Turn Winner ${room.players[bestanswerPlayerIdx]}`);
    }
}
export function cardzarEndTurn() {}

function generateRoomId() {
    const roomId = `${getRandomInt()}${getRandomInt()}${getRandomInt()}${getRandomInt()}`;
    return roomId;
}
function getRandomInt() {
    const min = Math.ceil(1);
    const max = Math.floor(9);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

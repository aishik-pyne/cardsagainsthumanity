<template>
  <div class="container-fluid">
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-3">
        <div class="tile is-parent is-vertical">
          <div class="tile is-child">
            <RoomPlayers :players="room.players"></RoomPlayers>
          </div>
          <div class="tile is-child box">
            <RoomInvite :id="room.id"></RoomInvite>
          </div>
        </div>
      </div>
      <div class="tile is-parent is-6">
        <div v-if="!isGameStarted" class="tile is-child box">
          <h1 class="title">Settings</h1>
          <div class="section">
            <RoomSettings :settings="room.settings"></RoomSettings>
          </div>
          <div class="section">
            <div class="field is-grouped-centered">
              <div class="control">
                <button class="button is-large is-dark" @click="startGame()">
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="tile is-child box">
          <CardzarView
            v-if="isCardzar"
            :question="room.game.question"
            :answers="room.game.answers"
          ></CardzarView>
          <PlayerView v-else :question="room.game.question" :answerChoices="answerChoices"></PlayerView>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
import CardzarView from "../game/CardzarView";
import PlayerView from "../game/PlayerView";
import RoomSettings from "../room/RoomSettings";
import RoomPlayers from "../room/RoomPlayers";
import RoomInvite from "../room/RoomInvite";

export default {
  name: "RoomPage",
  components: {
    RoomSettings,
    RoomPlayers,
    RoomInvite,
    CardzarView,
    PlayerView,
  },
  props: {
    player: {
      type: Object,
      required: true,
    },
  },
  sockets: {
    ROOM_INFO: function (room) {
      if (room == null) {
        this.$router.push("/");
      }
      this.room = room;
      console.log("ROOM INFO RECEIVED");
      console.log(room);
    },
  },
  created() {
    this.$socket.client.emit("ROOM_INFO", this.$route.params.roomId);
  },
  computed: {
    isCardzar() {
      if (this.room.game != null) {
        return this.player.id == this.room.game.cardzar.id;
      }
      return false;
    },
    isGameStarted() {
      return this.room.state == 1;
    },
    answerChoices() {
      return this.room.game.answerChoices[this.player.id]
    }
  },
  data() {
    return {
      room: {
        id: "",
        settings: {
          max_players: 3,
          game_speed: "Normal",
        },
        state: 0,
        players: [],
        game: {
          question: "",
          answerChoices: {},
          answers: {}
        },
        admin: {
          id: "",
          name: "",
        },
      },
    };
  },
  methods: {
    startGame() {
      console.log("Start");
      this.$socket.client.emit("START_GAME", this.$route.params.roomId);
    },
  },
};
</script>
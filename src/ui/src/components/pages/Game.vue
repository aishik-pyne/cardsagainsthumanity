<template>
  <div class="container-fluid row">
    <div class="col-xs-2"><Scoreboard :players="room.players" /></div>
    <div v-if="room.started" class="col-xs-10">
      <div class="row">
        <QuestionCard :question="room.game.question" />
      </div>
      <div class="row">
        <AnswerCard
          v-for="ans in room.game.cards[player.id]"
          :key="ans"
          :answer="ans"
          @click="clickCard(ans)"
        ></AnswerCard>
      </div>
    </div>
    <div v-else class="col-xs-10">
      <div v-if="admin">
        <button class="button" @click="startGame">Start Game</button>
      </div>
      <div v-else>
        <p>Waiting for Game to Start</p>
      </div>
    </div>
  </div>
</template>
<script>
import QuestionCard from "../cards/QuestionCard";
import AnswerCard from "../cards/AnswerCard";
import Scoreboard from "../scoreboard/Scoreboard";
export default {
  name: "GamePage",
  props: {
    player: {
      type: Object,
      required: true,
    },
  },
  components: {
    AnswerCard,
    QuestionCard,
    Scoreboard,
  },
  data() {
    return {
      room: {
        players: [],
        game: {
          question: "",
          cards: {},
        },
        started: false,
      },
      admin: false,
    };
  },
  sockets: {
    START_GAME: function () {
      this.game_start = true;
    },
    ROOM_INFO: function (room) {
      console.log("Got Room INformation");
      console.log(room);
      this.room = room;
      this.admin = this.player.id == room.admin;
    },
  },
  mounted() {
    this.$socket.client.emit("ROOM_INFO", this.$route.params.roomId);
  },
  methods: {
    getRoomInfo() {},
    startGame() {
      this.$socket.client.emit("START_GAME", this.$route.params.roomId);
    },
  },
};
</script>
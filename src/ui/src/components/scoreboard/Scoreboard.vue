<template>
  <div class="scoreboard">
    <div class="round">Round {{ round }}</div>
    <div
      class="scoreline"
      :class="{ cardzar: player.cardzar }"
      v-for="player in players"
      :key="player.name"
    >
      <div class="name">
        {{ player.name }}
      </div>
      <div class="score">{{ player.score }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ScoreBoard",
  props: {
    // players: {
    //   type: Object,
    //   required: true,
    // },
  },
  data() {
    return {
      round: 3,
      players: [
        {
          name: "Pinney",
          score: 4,
          cardzar: true,
        },
        {
          name: "BuchoBoy",
          score: 2,
          cardzar: false,
        },
        {
          name: "PaulnAll",
          score: 1,
          cardzar: false,
        },
        {
          name: "Obhi",
          score: 2,
          cardzar: false,
        },
      ],
    };
  },
};
</script>
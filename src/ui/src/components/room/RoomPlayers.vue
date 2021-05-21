<template>
  <div class="block">
    <div v-for="player in players" :key="player.id">
      <div class="box is-size-4">
        {{ player.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomPlayers",
  props: {
    players: {
      type: Array,
    },
  },
  methods: {},
};
</script>
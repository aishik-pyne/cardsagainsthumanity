<template>
  <div id="app">
    <div class="section">
      <router-view :player="player"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  sockets: {
    PLAYER_INFO: function (player) {
      console.log("PLAYER INFO RECEIVED");
      console.log(player);
      this.player = player;
      localStorage.setItem("name", this.player.name);
    },
  },
  data() {
    return {
      player: {
        name: "",
        id: "",
      },
    };
  },
};
</script>

<style lang="scss">
@import "./assets/main.scss";
</style>

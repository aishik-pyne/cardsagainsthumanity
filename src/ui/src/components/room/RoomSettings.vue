<template>
  <div class="field is-horizontal">
    <div class="field-body">
      <div class="field has-addons">
        <div class="control">
          <button type="submit" class="button is-dark">Max Players</button>
        </div>
        <div class="control is-expanded">
          <div class="select is-fullwidth is-dark">
            <select
              @change="updateMaxPlayers($event)"
              name="max_players"
              :value="settings.max_players"
            >
              <option v-for="index in 6" :key="index" :value="index">
                {{ index }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="field has-addons">
        <div class="control">
          <button type="submit" class="button is-dark">Game Speed</button>
        </div>
        <div class="control is-expanded">
          <div class="select is-fullwidth is-dark">
            <select @change="updateGameSpeed($event)" name="game_speed">
              <option value="Normal">Normal</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomSettings",
  props: {
    settings: {
      type: Object,
    },
  },
  methods: {
    updateMaxPlayers($event) {
      this.$socket.client.emit("UPDATE_ROOM_MAXPLAYERS", $event.target.value);
    },
    updateGameSpeed($event) {
      this.$socket.client.emit("UPDATE_ROOM_GAMESPEED", $event.target.value);
    },
  },
};
</script>
<template>
  <div class="tile is-ancestor">
    <div class="tile is-vertical is-4">
      <div class="tile">
        <div class="tile is-parent">
          <div class="tile is-child box">
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Name</label>
              </div>
              <div class="field-body">
                <div class="control has-icons-left">
                  <input
                    class="input"
                    type="email"
                    placeholder="Name"
                    v-model="player.name"
                  />
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal"></div>
              <div class="field-body">
                <div class="control has-icons-left">
                  <button
                    class="button is-dark"
                    @click="setName(player.name)"
                    v-if="player.name != oldName()"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tile is-parent">
      <div class="tile is-child box">
        <div class="field has-addons">
          <div class="control">
            <button class="button is-dark" @click="createRoom()">
              Create Room
            </button>
          </div>
        </div>
      </div>
      <div class="tile is-child box">
        <div class="field has-addons">
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Room Id"
              v-model="joinRoomId"
            />
          </div>
          <div class="control">
            <button class="button is-dark" @click="joinRoom(joinRoomId)">
              Join Room
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LobbyPage",
  props: {
    player: {
      type: Object,
      required: true,
    },
  },
  computed: {},
  sockets: {
    CREATED_ROOM: function (roomId) {
      this.$router.push(`/${roomId}`);
    },
    JOINED_ROOM: function (roomId) {
      this.$router.push(`/${roomId}`);
    },
  },
  mounted() {
    this.joinRoomId =  this.$route.query.room_id;
  },
  methods: {
    oldName() {
      const on = localStorage.getItem("name");
      return on ? on : "";
    },
    createRoom() {
      this.$socket.client.emit("CREATE_ROOM");
    },
    setName(name) {
      console.log("Setname");
      this.$socket.client.emit("PLAYER_INFO_SETNAME", name);
    },
    joinRoom(roomId) {
      this.$socket.client.emit("JOIN_ROOM", roomId);
    },
  },
  data() {
    return {
      joinRoomId: "",
    };
  },
};
</script>
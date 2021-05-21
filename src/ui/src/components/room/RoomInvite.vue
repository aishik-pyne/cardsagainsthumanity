<template>
  <div class="block">
    <div class="field has-addons has-addons-centered">
      <p class="control">
        <button class="button is-dark" disabled> Copy </button>
      </p>
      <p class="control">
        <input
          class="input"
          type="text"
          placeholder="Amount of money"
          :value="gameLink"
        />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomPlayers",
  props: {
    id: {
      type: String,
    },
  },
  computed: {
    gameLink() {
      return `http://localhost:8080/?room_id=${this.id}`;
    },
  },
  methods: {
    copyLink() {
      var copyText = this.gameLink;

      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */

      /* Copy the text inside the text field */
      document.execCommand("copy");
    },
  },
};
</script>
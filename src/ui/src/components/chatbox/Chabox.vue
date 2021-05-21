<template>
  <div class="content">
    <ul v-for="(chat, idx) in chats" :key="idx">
      {{
        chat.time
      }}
      {{
        chat.from
      }}
      {{
        chat.text
      }}
    </ul>
  </div>
</template>

<script>
export default {
  setup() {},
  data() {
    return {
      chats: [
        {
          time: new Date().toLocaleString(),
          from: "pinney",
          text: "Hahahaah",
        },
        {
          time: new Date().toLocaleString(),
          from: "pinney",
          text: "Hahahaah",
        },
        {
          time: new Date().toLocaleString(),
          from: "pinney",
          text: "Hahahaah",
        },
      ],
    };
  },
};
</script>
<template>
  <div class="card answer">
    <p>{{ answer }}</p>
  </div>
</template>

<script>
export default {
  name: "AnswerCard",
  props: {
    answer: {
      type: String,
      required: true,
    },
  },
}
</script>

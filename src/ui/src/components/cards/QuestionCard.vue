<template>
  <div class="card question">
    <p>{{ question }}</p>
  </div>
</template>

<script>
export default {
  name: "QuestionCard",
  props: {
    question: {
      type: String,
      required: true,
    },
  },
}
</script>

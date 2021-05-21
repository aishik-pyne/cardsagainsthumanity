<template>
  <div class="card answer">
    <div class="card-content">
      <div class="h1 is-size-4">
        <p>{{ answer }}</p>
      </div>
    </div>
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

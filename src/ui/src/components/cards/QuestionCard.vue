<template>
  <div class="card question">
    <div class="card-content">
      <div class="h1 is-size-4">
        <p>{{ question }}</p>
      </div>
    </div>
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
};
</script>

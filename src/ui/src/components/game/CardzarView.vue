<template>
  <div class="container">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <QuestionCard :question="question"></QuestionCard>
      </div>
    </div>
    <div class="columns is-multiline">
      <div
        class="column is-one-fifth"
        v-for="(answer, idx) in answers"
        :key="idx"
        @click="clickCard(idx)"
      >
        <AnswerCard :answer="answer"></AnswerCard>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionCard from "../cards/QuestionCard";
import AnswerCard from "../cards/AnswerCard";
export default {
  name: "CardzarView",
  components: {
    QuestionCard,
    AnswerCard,
  },
  props: {
    question: {
      type: String,
    },
    answers: {
      type: Object,
    },
  },
  methods: {
    clickCard(idx) {
      console.log("Best Card Clicked");
      console.log(idx);
      this.$socket.client.emit("PICK_CARD_AS_BEST_ANSWER", idx);
    },
  },
};
</script>

<style>
</style>
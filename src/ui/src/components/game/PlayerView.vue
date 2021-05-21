<template>
  <div class="container">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <QuestionCard :question="question"></QuestionCard>
      </div>
    </div>
    <div class="columns is-multiline">
      <div
        class="column is-one-quarter-fullhd"
        v-for="(answer, idx) in answerChoices"
        :key="idx"
        @click="clickCard(idx)"
      >
        <AnswerCard :answer="answer" ></AnswerCard>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionCard from "../cards/QuestionCard";
import AnswerCard from "../cards/AnswerCard";
export default {
  name: "PlayerView",
  components: {
    QuestionCard,
    AnswerCard,
  },
  props: {
    question: {
      type: String,
    },
    answerChoices: {
      type: Array,
    },
  },
  methods: {
    clickCard(idx) {
      console.log("Card Clicked");
      this.$socket.client.emit("PICK_CARD_TO_ANSWER", idx);
    }
  }
};
</script>

<style>
</style>
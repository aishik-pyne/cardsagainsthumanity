<template>
  <div class="container-fluid row">
    <div class="col-xs-2"><Scoreboard/></div>
    <div class="col-xs-10">
      <div class="row">
        <QuestionCard :question="question" />
      </div>
      <div class="row">
        <AnswerCard
          v-for="ans in answers"
          :key="ans"
          :answer="ans"
        ></AnswerCard>
      </div>
    </div>
  </div>
</template>
<script>
import QuestionCard from "../cards/QuestionCard";
import AnswerCard from "../cards/AnswerCard";
import Scoreboard from "../scoreboard/Scoreboard";
export default {
  name: "GamePage",
  components: {
    AnswerCard,
    QuestionCard,
    Scoreboard,
  },
  data() {
    return {
      question: "Why can't I sleep at night?",
      answers: [
        "Flying sex snakes.",
        "Michelle Obama's arms.",
        "German dungeon porn.",
        "White people.",
        "Getting so angry that you pop a boner.",
        "Tasteful sideboob.",
        "Praying the gay away.",
        "Two midgets shitting into a bucket.",
        "MechaHitler.",
        "Being a motherfucking sorcerer.",
      ],
    };
  },
};
</script>
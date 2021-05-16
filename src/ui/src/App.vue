<template>
  <div id="app">
    <GamePage></GamePage>
    <!-- <QuestionCard :question="question"></QuestionCard>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import QuestionCard from './components/cards/QuestionCard.vue'
import GamePage from './components/pages/Game.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // QuestionCard,
    GamePage
  },
  data() {
    return {
      question: "What is the most difficult position?"
    }
  }
}
</script>
<style lang="scss">
@import './assets/main.scss';
</style>

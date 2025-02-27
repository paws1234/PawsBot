<template>
  <div class="app">
    <Chat />
  </div>
</template>

<script>
import Chat from "./components/Chat.vue";

export default {
  components: { Chat }
};
</script>

<style>
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f4f4f4;
}
</style>

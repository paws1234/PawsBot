<template>
  <div :class="msg.sender === 'user' ? 'message-user' : 'message-bot'">
    {{ msg.text }}
  </div>
</template>

<script>
export default {
  props: ["msg"]
};
</script>

<style scoped>
.message-user {
  background: #007bff;
  color: white;
  padding: 5px;
  border-radius: 5px;
  text-align: right;
}

.message-bot {
  background: #e0e0e0;
  padding: 5px;
  border-radius: 5px;
  text-align: left;
}
</style>

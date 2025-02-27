<template>
  <div class="chat-container">
    <div class="chat-box">
      <!-- Messages Container -->
      <div class="messages" ref="messagesContainer">
        <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.sender]" v-html="msg.text"></div>
        <div v-if="isTyping" class="typing-indicator">Typing...</div>
      </div>

      <div class="input-container">
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newMessage: "",
      messages: [],
      isTyping: false,
    };
  },
  methods: {
    async sendMessage() {
      if (!this.newMessage.trim()) return;

      this.messages.push({ text: this.formatText(this.newMessage), sender: "user" });
      const userMessage = this.newMessage;
      this.newMessage = "";
      this.isTyping = true;

      this.$nextTick(() => this.scrollToBottom());

      try {
        const response = await axios.post("https://psychic-couscous-qw4x67v4gx4fx77x-5000.app.github.dev/api/chat", { message: userMessage });
        this.messages.push({ text: this.formatText(response.data.reply), sender: "bot" });
      } catch (error) {
        this.messages.push({ text: "<span style='color: red;'>Error connecting to chatbot.</span>", sender: "bot" });
      }

      this.isTyping = false;
      this.$nextTick(() => this.scrollToBottom());
    },
    
    formatText(text) {
      text = text.replace(/\n/g, "<br>");

      text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');

      text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

      text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");

      return text;
    },

    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }
};
</script>

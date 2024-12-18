<template>
 <v-btn @click="goBack" class="bg-transparent elevation-0">Voltar</v-btn>
</template>

<script setup lang="ts">

function goBack() {
  window.history.back();
} 
</script>
<script setup>
import { ref } from "vue";
const pwdStrength = ref("Weak");
</script>
<template>
  <div class="flex justify-between uppercase text-base bg-veryDarkGrey p-6">
    <p class="text-grey">Strength</p>
    <div class="flex items-center gap-4">
      <span class="text-almostWhite">{{ pwdStrength }}</span>
      <div class="flex gap-2">
        <div
          v-for="i in 4"
          :key="i"
          :id="i"
          class="h-6 w-2.5 border-2 border-almostWhite"
        ></div>
      </div>
    </div>
  </div>
</template>

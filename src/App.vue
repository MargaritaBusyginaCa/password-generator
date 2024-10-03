<script setup>
import PasswordInput from "@/components/PasswordInput.vue";
import Slider from "./components/Slider.vue";
</script>

<template>
  <main
    class="h-screen w-full bg-veryDarkGrey flex flex-col justify-center items-center"
  >
    <h1 class="text-grey text-2xl mb-6">Password Generator</h1>
    <PasswordInput />
    <div class="w-[400px] m-4">
      <Slider />
    </div>
  </main>
</template>

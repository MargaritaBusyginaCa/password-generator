<script setup>
import PasswordInput from "@/components/PasswordInput.vue";
import Slider from "@/components/Slider.vue";
import CheckboxGroup from "@/components/CheckboxGroup.vue";
import StrengthCard from "./components/StrengthCard.vue";
import { ref, watch } from "vue";

const selectedOptions = ref([]);
const charLength = ref(0);
const checkboxOptions = [
  { value: "uppercase", label: "Include Uppercase Letters" },
  { value: "lowercase", label: "Include Lowercase Letters" },
  { value: "numbers", label: "Include Numbers" },
  { value: "symbols", label: "Include Symbols" },
];
const generatedPwd = ref("");
function randomizePassword() {
  let result = "";
  let charList = "abcdefghijklmnopqrstuvwxyz";
  if (selectedOptions.value.includes("numbers")) {
    charList = `${charList}0123456789`;
  }
  if (selectedOptions.value.includes("symbols")) {
    charList = `${charList}!@#$%^&*()_-+=`;
  }

  for (let i = 0; i < charLength.value; i++) {
    let randomChar = charList.charAt(
      Math.floor(Math.random() * charList.length)
    );
    if (
      selectedOptions.value.includes("uppercase") &&
      selectedOptions.value.includes("lowercase")
    ) {
      if (/[a-z]/.test(randomChar) && Math.random() > 0.5) {
        randomChar = randomChar.toUpperCase();
      }
    }

    result += randomChar;
    if (
      selectedOptions.value.includes("uppercase") &&
      !selectedOptions.value.includes("lowercase")
    ) {
      result = result.toUpperCase();
    }
  }
  generatedPwd.value = result;
}
watch(charLength, () => {
  randomizePassword();
});
watch(selectedOptions, () => {
  randomizePassword();
});
</script>

<template>
  <main
    class="h-screen w-full bg-veryDarkGrey flex flex-col justify-center items-center"
  >
    <h1 class="text-grey text-2xl mb-6">Password Generator</h1>
    <PasswordInput :generatedPwd="generatedPwd" />
    <div class="w-card m-4 px-8 py-5 bg-darkGrey">
      <Slider v-model="charLength" />
      <CheckboxGroup :options="checkboxOptions" v-model="selectedOptions" />
      <StrengthCard />
    </div>
  </main>
</template>

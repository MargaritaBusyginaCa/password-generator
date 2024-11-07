<script setup>
import PasswordInput from "@/components/PasswordInput.vue";
import Slider from "@/components/Slider.vue";
import CheckboxGroup from "@/components/CheckboxGroup.vue";
import StrengthCard from "./components/StrengthCard.vue";
import Button from "./components/Button.vue";
import { ref } from "vue";

const selectedOptions = ref([]);
const charLength = ref(5);
const checkboxOptions = [
  { value: "uppercase", label: "Include Uppercase Letters" },
  { value: "lowercase", label: "Include Lowercase Letters" },
  { value: "numbers", label: "Include Numbers" },
  { value: "symbols", label: "Include Symbols" },
];

const generatedPwd = ref("");
const pwdStrength = ref("");
function randomizePassword() {
  const baseCharList = [
    "abcdefghijklmnopqrstuvwxyz",
    selectedOptions.value.includes("numbers") ? "0123456789" : "",
    selectedOptions.value.includes("symbols") ? "!@#$%^&*()_-+=" : "",
  ].join("");

  let result = "";
  for (let i = 0; i < charLength.value; i++) {
    let randomChar = baseCharList.charAt(
      Math.floor(Math.random() * baseCharList.length)
    );
    if (selectedOptions.value.includes("uppercase") && Math.random() > 0.5) {
      randomChar = randomChar.toUpperCase();
    }
    result += randomChar;
  }
  generatedPwd.value = result;
  pwdStrength.value = calculatePwdStrength();
}

function calculatePwdStrength() {
  const optionCount = selectedOptions.value.length;
  if (charLength.value >= 12 && optionCount === checkboxOptions.length)
    return "strong";
  if (charLength.value >= 8 && optionCount >= 2) return "medium";
  return charLength.value >= 6 ? "weak" : "too-weak";
}
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
      <StrengthCard :pwdStrength="pwdStrength" />
      <Button @generatePwd="randomizePassword" />
    </div>
  </main>
</template>

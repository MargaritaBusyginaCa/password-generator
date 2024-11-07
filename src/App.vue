<script setup>
import PasswordInput from "@/components/PasswordInput.vue";
import Slider from "@/components/Slider.vue";
import CheckboxGroup from "@/components/CheckboxGroup.vue";
import StrengthCard from "./components/StrengthCard.vue";
import Button from "./components/Button.vue";
import { ref, computed } from "vue";

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
  pwdStrength.value = calculatePwdStrength();
}
function calculatePwdStrength() {
  if (
    (charLength.value >= 12 &&
      selectedOptions.value.length === checkboxOptions.length) ||
    (charLength.value >= 15 && selectedOptions.value.includes("symbols")) ||
    (charLength.value >= 15 && selectedOptions.value.includes("numbers"))
  ) {
    return "strong";
  } else if (
    (charLength.value >= 8 &&
      charLength.value <= 11 &&
      selectedOptions.value.length === checkboxOptions.length) ||
    (charLength.value >= 8 &&
      charLength.value <= 14 &&
      selectedOptions.value.includes("symbols")) ||
    (charLength.value >= 8 &&
      charLength.value <= 14 &&
      selectedOptions.value.includes("numbers")) ||
    (selectedOptions.value.length === 0 && charLength.value >= 11)
  ) {
    return "medium";
  } else if (
    (charLength.value >= 8 &&
      charLength.value < 11 &&
      selectedOptions.value.length === 0) ||
    (charLength.value >= 6 &&
      charLength.value < 8 &&
      selectedOptions.value.includes("symbols")) ||
    (charLength.value >= 6 &&
      charLength.value < 8 &&
      selectedOptions.value.includes("numbers")) ||
    (charLength.value >= 8 &&
      !selectedOptions.value.includes("numbers") &&
      !selectedOptions.value.includes("symbols"))
  ) {
    return "weak";
  } else {
    return "too-weak";
  }
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

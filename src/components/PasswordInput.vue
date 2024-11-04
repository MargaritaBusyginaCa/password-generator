<script setup>
import { ref, watch, toRef, computed } from "vue";
import copyIcon from "@/assets/images/icon-copy.svg";
import copyIconHover from "@/assets/images/icon-copy-hover.svg";
const props = defineProps({
  generatedPwd: String,
});
const currentStateIcon = ref(copyIcon);
const password = ref("P4$5W0rD!");
const initialState = ref(true);
function hoverState() {
  currentStateIcon.value = copyIconHover;
}
function unHoverState() {
  currentStateIcon.value = copyIcon;
}
function copyPassword() {
  //Copies the text inside the text field
  navigator.clipboard.writeText(password.value);
}
const generatedPwd = toRef(props, "generatedPwd");
const selectableClass = computed(() => {
  return initialState.value
    ? ["select-none", "opacity-25"]
    : ["select-text", "opacity-100"];
});
watch(generatedPwd, (newVal) => {
  password.value = newVal;
  initialState.value = false;
});
</script>

<template>
  <div class="flex items-center justify-between py-5 px-8 bg-darkGrey w-card">
    <p :class="['text-3xl', 'text-almostWhite', selectableClass]">
      {{ password }}
    </p>
    <img
      id="copy-icon"
      :src="currentStateIcon"
      alt="copy text icon"
      class="cursor-pointer"
      @mouseenter="hoverState"
      @mouseleave="unHoverState"
      @click="copyPassword"
    />
  </div>
</template>

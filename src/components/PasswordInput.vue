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
  if (!initialState.value) {
    navigator.clipboard.writeText(password.value);
  }
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
  <div
    class="flex items-center justify-between py-5 px-4 bg-darkGrey w-full md:w-card md:px-8"
  >
    <p
      :class="['text-base', 'md:text-3xl', 'text-almostWhite', selectableClass]"
    >
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

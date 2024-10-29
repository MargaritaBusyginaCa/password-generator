<script setup>
import { ref } from "vue";
import copyIcon from "@/assets/images/icon-copy.svg";
import copyIconHover from "@/assets/images/icon-copy-hover.svg";

const currentStateIcon = ref(copyIcon);
const password = ref("PTx1f5DaFX");
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
</script>

<template>
  <div
    class="flex items-center justify-between py-5 px-8 bg-darkGrey w-[400px]"
  >
    <p class="text-3xl text-almostWhite">{{ password }}</p>
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

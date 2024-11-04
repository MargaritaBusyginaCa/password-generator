<script setup>
import { ref, defineEmits } from "vue";
import iconArrowRight from "@/assets/images/icon-arrow-right.svg";
import iconArrowRightHover from "@/assets/images/icon-arrow-right-hover.svg";
const currentStateIcon = ref(iconArrowRight);
const emit = defineEmits(["generatePwd"]);
function hoverState() {
  currentStateIcon.value = iconArrowRightHover;
}
function unHoverState() {
  currentStateIcon.value = iconArrowRight;
}
function generatePwd() {
  emit("generatePwd");
}
</script>
<template>
  <button
    class="w-full flex justify-center items-center gap-4 bg-green uppercase text-darkGrey p-4 mt-7 mb-2 hover:bg-transparent border border-green hover:text-green"
    @mouseenter="hoverState"
    @mouseleave="unHoverState"
    @click="generatePwd"
  >
    Generate
    <span
      ><img :src="currentStateIcon" alt="arrow pointing right" class="h-2.5"
    /></span>
  </button>
</template>

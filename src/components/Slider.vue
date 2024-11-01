<script setup>
import { ref, defineEmits } from "vue";
defineProps({
  modelValue: Number,
});
const isDragging = ref(false);
const offsetX = ref(0);
const charNum = ref(5);
const emit = defineEmits(["update:modelValue"]);

function updateChar(value) {
  emit("update:modelValue", value);
}
function getSliderCircle() {
  return document.querySelector(".slider-circle");
}

function getSliderLineWidth() {
  return document.querySelector(".slider-line").clientWidth;
}

function getActiveSliderLine() {
  return document.querySelector(".slider-line-active");
}
function mouseDown(e) {
  isDragging.value = true;
  const draggable = getSliderCircle();
  offsetX.value = e.clientX - draggable.offsetLeft;
  draggable.style.cursor = "grabbing";
}

function mouseMove(e) {
  if (isDragging.value) {
    const draggable = getSliderCircle();
    const sliderLineWidth = getSliderLineWidth();
    const circleWidth = draggable.clientWidth;

    let newLeft = e.clientX - offsetX.value;

    if (newLeft < 0) {
      newLeft = 0;
    } else if (newLeft > sliderLineWidth - circleWidth) {
      newLeft = sliderLineWidth - circleWidth;
    }

    draggable.style.left = `${newLeft}px`;

    const activeSliderLine = getActiveSliderLine();
    activeSliderLine.style.width = `${newLeft}px`;

    // Calculates the character length based on slider position
    const maxChars = 15;
    const minChars = 5;
    const sliderPosition = newLeft / (sliderLineWidth - circleWidth);
    charNum.value = Math.round(
      minChars + sliderPosition * (maxChars - minChars)
    );
    updateChar(charNum.value);
  }
}

function mouseUp() {
  isDragging.value = false;
  const draggable = getSliderCircle();
  draggable.style.cursor = "grab";
}

document.addEventListener("mousemove", mouseMove);
document.addEventListener("mouseup", mouseUp);
</script>

<template>
  <div class="text-white mb-7 flex justify-between items-center">
    <h2 class="text-base">Character Length</h2>
    <span class="text-lg text-green">{{ charNum }}</span>
  </div>
  <div
    class="slider-line w-full h-2 bg-veryDarkGrey relative cursor-pointer mb-4"
  >
    <div
      class="slider-line-active w-0 h-2 bg-green relative cursor-pointer"
    ></div>
    <div
      class="slider-circle bg-veryDarkGrey border-2 border-green border-solid absolute rounded-full"
      @mousedown="mouseDown"
    ></div>
  </div>
</template>

<style scoped>
.slider-circle {
  top: -13px;
  height: 35px;
  width: 35px;
}
</style>

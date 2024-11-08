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

function startDrag(e) {
  isDragging.value = true;
  const draggable = getSliderCircle();
  const clientX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
  offsetX.value = clientX - draggable.offsetLeft;
  draggable.style.cursor = "grabbing";
}

function dragMove(e) {
  if (isDragging.value) {
    const draggable = getSliderCircle();
    const sliderLineWidth = getSliderLineWidth();
    const circleWidth = draggable.clientWidth;

    const clientX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
    let newLeft = clientX - offsetX.value;

    if (newLeft < 0) {
      newLeft = 0;
    } else if (newLeft > sliderLineWidth - circleWidth) {
      newLeft = sliderLineWidth - circleWidth;
    }

    draggable.style.left = `${newLeft}px`;

    const activeSliderLine = getActiveSliderLine();
    activeSliderLine.style.width = `${newLeft}px`;

    // Calculates the character length based on slider position
    const maxChars = 20;
    const minChars = 5;
    const sliderPosition = newLeft / (sliderLineWidth - circleWidth);
    charNum.value = Math.round(
      minChars + sliderPosition * (maxChars - minChars)
    );
    updateChar(charNum.value);
  }
}

function endDrag() {
  isDragging.value = false;
  const draggable = getSliderCircle();
  draggable.style.cursor = "grab";
}

document.addEventListener("mousemove", dragMove);
document.addEventListener("mouseup", endDrag);
document.addEventListener("touchmove", dragMove, { passive: false });
document.addEventListener("touchend", endDrag);
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
      @mousedown="startDrag"
      @touchstart.prevent="startDrag"
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

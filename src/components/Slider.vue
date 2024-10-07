<script setup>
import { ref } from "vue";
const isDragging = ref(false);
const offsetX = ref(false);

function getSliderCircle() {
  return document.querySelector(".slider-circle");
}
function getSliderLineWidth() {
  return document.querySelector(".slider-line").clientWidth;
}

function mouseDown(e) {
  isDragging.value = true;

  const draggable = getSliderCircle();
  isDragging.value = true;

  offsetX.value = e.clientX - draggable.offsetLeft;
  draggable.style.cursor = "grabbing";
}
const charNum = ref(10);
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
    console.log(newLeft);
    console.log(sliderLineWidth);
    charNum.value = Math.round(((newLeft / 100) * sliderLineWidth) / 73);
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
  <p class="text-white my-7">char number: {{ charNum }}</p>
  <div class="slider-line w-full h-2 bg-green relative cursor-pointer">
    <div
      class="slider-circle bg-darkGrey border-2 border-green border-solid absolute rounded-full"
      @mousedown="mouseDown"
      @mousemove="mouseOver"
      @mouseup="mouseUp"
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

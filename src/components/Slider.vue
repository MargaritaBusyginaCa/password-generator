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
function mouseOver(e) {
  if (isDragging.value) {
    const draggable = getSliderCircle();
    draggable.style.left = `${e.clientX - offsetX.value}px`;
  }
}
function mouseUp() {
  isDragging.value = false;
  const draggable = getSliderCircle();
  draggable.style.cursor = "grab";
}
</script>

<template>
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

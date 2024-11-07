<script setup>
import { computed } from "vue";
const props = defineProps({
  pwdStrength: String,
});

const containerProperties = computed(() => {
  switch (props.pwdStrength) {
    case "strong":
      return { num: 4, title: "Strong", bgStyle: "bg-green" };
    case "medium":
      return { num: 3, title: "Medium", bgStyle: "bg-yellow" };
    case "weak":
      return { num: 2, title: "Weak", bgStyle: "bg-orange" };
    case "too-weak":
      return { num: 1, title: "Too Weak!", bgStyle: "bg-red" };
    default:
      return { num: 0, title: "", bgStyle: "" };
  }
});

/*
 * Array.from is used to create a new array.
 * { length: 4 } specifies that the array should have 4 elements.
 * For each index i, if i is less than containerProperties.value.num, the expression returns true; otherwise, it returns false
 * For example, for medium strength (3) it will return [true, true, true, false]
 */
const filledDivs = computed(() => {
  return Array.from({ length: 4 }, (_, i) => i < containerProperties.value.num);
});
</script>
<template>
  <div class="flex justify-between uppercase text-base bg-veryDarkGrey p-6">
    <p class="text-grey">Strength</p>
    <div class="flex items-center gap-4">
      <span class="text-almostWhite">{{ containerProperties.title }}</span>
      <div class="flex gap-2">
        <div
          v-for="(filled, i) in filledDivs"
          :key="i"
          :id="i"
          :class="[
            'h-6',
            'w-2.5',
            'border-2',
            'border-almostWhite',
            filled
              ? `${containerProperties.bgStyle} border-none`
              : 'border-almostWhite',
          ]"
        ></div>
      </div>
    </div>
  </div>
</template>

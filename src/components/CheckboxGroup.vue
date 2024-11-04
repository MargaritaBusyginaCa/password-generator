<script setup>
import { defineEmits } from "vue";
import iconCheck from "@/assets/images/icon-check.svg";
const props = defineProps({
  modelValue: Array,
  options: Array,
});
const emit = defineEmits(["update:modelValue"]);

function toggleCheckbox(value) {
  const newValue = [...props.modelValue];
  const index = newValue.indexOf(value);
  if (index > -1) newValue.splice(index, 1);
  else newValue.push(value);
  emit("update:modelValue", newValue);
}
</script>
<template>
  <div class="py-4 relative">
    <label
      v-for="option in options"
      :key="option.label"
      class="text-almostWhite text-base flex gap-5 my-2 items-center hover:cursor-pointer"
    >
      <input
        type="checkbox"
        :value="option.value"
        :checked="modelValue.includes(option.value)"
        class="w-5 h-5 appearance-none bg-darkGrey border-green checked:bg-green accent-darkGrey border cursor-pointer peer"
        @change="toggleCheckbox(option.value)"
      />
      <img
        :src="iconCheck"
        alt="checkbox check mark"
        class="h-4 w-4 absolute ml-0.5 mt-0.5 opacity-0 peer-checked:opacity-100"
      />
      {{ option.label }}
    </label>
  </div>
</template>

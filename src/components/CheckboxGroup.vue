<script setup>
import { defineEmits } from "vue";
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
  <div class="py-4">
    <label
      v-for="option in options"
      :key="option.label"
      class="text-white flex gap-4 my-2"
    >
      <input
        type="checkbox"
        :value="option.value"
        :checked="modelValue.includes(option.value)"
        class="w-5 h-5 appearance-none bg-darkGrey border-green checked:bg-green accent-darkGrey border cursor-pointer"
        @change="toggleCheckbox(option.value)"
      />
      {{ option.label }}
    </label>
  </div>
</template>

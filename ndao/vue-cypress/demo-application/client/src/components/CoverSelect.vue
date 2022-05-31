<template>
  <div>
    <label>Cover Image</label>
    <img :src="modelValue" />
    <ul>
      <li v-for="cover in covers" :key="cover.id">
        <input
          :name="cover.name"
          :id="`${cover.name}-${cover.id}`"
          :value="cover.value"
          @input="$emit('update:modelValue', $event.target.value)"
          :checked="modelValue === cover.value"
          type="radio"
        />
        <label :for="`${cover.name}-${cover.id}`"
          >Event Cover {{ cover.id }}</label
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["name", "modelValue"],
  data: (props) => {
    return {
      covers: [
        {
          id: 1,
          name: props.name,
          value: "./assets/event-1.jpg",
        },
        {
          id: 2,
          name: props.name,
          value: "./assets/event-2.jpg",
        },
        {
          id: 3,
          name: props.name,
          value: "./assets/event-3.jpg",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
div {
  & > label {
    display: block;
    margin-bottom: 5px;
  }
  img {
    width: 320px;
    display: block;
    margin: 0 auto;
    border-radius: 20px;
    height: 220px;
  }
  li {
    display: block;
    text-align: center;
    input {
      margin-right: 10px;
    }
    input,
    label {
      position: relative;
      left: -10px;
    }
  }
}
</style>
<template>
  <div class="home">
    <h1>Random Dog Images by Duy</h1>
    <h2>Dog count: {{ counter }}</h2>
    <button @click="getDog">Get dog</button>
    <div class="dog-wrapper">
      <div class="picture-dog">
        <img :src="image" alt />
      </div>
      <button id="myCounter" v-on:click="increase()">
        Increment dog count
      </button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "home",
  created() {
    this.counter = 1;
    this.getDog();
  },
  data: function () {
    return {
      counter: 0,
      image: "",
    };
  },
  methods: {
    increase: function () {
      this.counter++;
    },
    getDog: function () {
      fetch("https://dog.ceo/api/breeds/image/random")
        .then((res) => res.json())
        .then((path) => {
          this.image = path.message;
        });
    },
  },
};
</script>
<style lang="css">
button {
  color: blue;
  background-color: white;
  border-radius: 10px;
  font-size: 2rem;
  border-style: solid;
  border-color: bisque;
  box-shadow: inset 0px 1px 0px rgba(75, 166, 255, 0.3);
  outline: none;
}

button:hover {
  text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
  transition: all 0.4s ease 0s;
  box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
}
img {
  max-width: 30%;
  padding: 30px;
}
* {
  font-family: "Comic Sans MS", "Comic Sans", cursive;
}
h1 {
  color: crimson;
}
</style>

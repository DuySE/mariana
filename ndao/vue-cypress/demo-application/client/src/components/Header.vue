<template>
  <div>
    <header>
      <h1>
        <router-link to="/" data-cy="home-link"
          ><img src="/assets/globoticket-horizontal-white.svg"
        /></router-link>
      </h1>
      <div class="action-items">
        <router-link data-cy="create-event-link" to="/create-event">Create Event</router-link>
        <router-link data-cy="list-events-link" to="/list-events">List Events</router-link>
      </div>
    </header>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
header {
  align-items: center;
  background-color: #000;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 17px 37px;
  h1 {
    margin: 0;
    width: 20%;
    img {
      min-width: 120px;
      max-width: 200px;
      width: 100%;
    }
  }
  div.action-items {
    width: 80%;
    text-align: right;
    font-size: 1.9vw;
    a {
      transition: 300ms;
      text-decoration: none;
      color: rgb(255, 255, 255);
      border-bottom: 1px solid transparent;
      &:hover {
        transition: 300ms;
        border-color: rgb(255, 255, 255);
        cursor: pointer;
      }
      &:nth-child(1) {
        margin-right: 5%;
      }
    }
  }
}
</style>
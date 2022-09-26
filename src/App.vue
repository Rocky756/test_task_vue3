<template>
  <div id="app">
    <suspense>
      <router-view></router-view>
    </suspense>
  </div>
</template>
<script>
  export default {
    name: 'App',
  };
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  width: 100vw;
  height: 100vh;
}

li {
  list-style-type: none;
  text-align: start;
}

.container {
  margin-top: 5vh;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.pointer {
  cursor: pointer;
}
.add-btn {
  border-radius: 6px !important;
  margin-left: 20vw;
}
.back-btn {
  background-color: rgb(228, 228, 228) !important;
  border: 1px solid rgb(67, 67, 67) !important;
}
.mb-20 {
  margin-bottom: 20px;
}
.back-btn:hover {
  color: black !important;
  background-color: rgb(169, 169, 169) !important;
}
.weight {
  font-weight: 700;
}
.margin-bottom {
  margin-bottom: 20px !important;
}
.buttons-container {
  display: flex;
  flex-direction: column;
  justify-content: left;
  // align-items: flex-start;
}
</style>

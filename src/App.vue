<template>
  <router-view></router-view>
  <div style="height: 5rem;"></div>
  <!--解决tabbar的遮盖内容问题-->
  <van-tabbar route v-model="active">
    <van-tabbar-item replace to="/enroll" icon="friends-o">招新报名</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { ref, reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    let active = ref(0)
    return {
      active
    }
  }
}
</script>

<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0px;
  background-color: #DFF6FD;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 0;
  width: 80%;
  padding-top: 5vh;
}

.wrap-container {
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}

.border-container {
  width: 100%;
  padding-left: 1vw;
  padding-right: 1vw;
  border:dotted 4px #41403E;
}

.sub-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

p {
  width: 100%;
  text-indent: 2em;
  margin-top: 5px;
  margin-bottom: 0px;
  line-height: 180%;
}

h2 {
  margin-bottom: 5px;
}
h3 {
  margin-top: 8px;
  margin-bottom: 8px;
  border: 2px inset cyan;
  padding: 6px 10px;
  border-radius: 3rem;/*50%;*/
  background-color:balck;
  color: #0073bb;
}
h4 {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  padding: 6px 10px;
  color: #0073bb;
  border-width: 3px;
  border-style:inset;
  border-color:rgba(0, 170, 255, 0.401) rgb(30, 255, 248);
  border-radius: 12px;
}
h4, h5 {
  margin-top: 8px;
  margin-bottom: 8px;
}
ol {
  line-height: 150%;
}

li {
  line-height: 180%;
}

.title {
  color: skyblue
}
.important {
  color: #0073bb;
  font-weight: bold;
}
.note {
  font-style: italic;
  color: rgb(0, 89, 255);
}
.text-important {
  color: #0073bb;
  font-weight: bold;
}
a {
  text-decoration: none;
  margin-top: 5px;
  margin-bottom: 5px;
  color: #1989fa
}
a:hover, a:link, a:visited, a:active {
  color: #1989fa
}
</style>

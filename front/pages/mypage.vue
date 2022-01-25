<template>
  <div>
    <div v-if="user">
      <p>Email: {{ user.email }}</p>
      <p>名前: {{ user.name }}</p>
    </div>
    <v-btn @click="logOut">LOGOUT</v-btn>
  </div>
</template>

<script>
  import firebase from "@/plugins/firebase";
  export default {
    computed: {
      user() {
        return this.$store.state.auth.currentUser;
      },
    },
    methods: {
      async logOut() {
        await firebase
          .auth()
          .signOut()
          .catch((error) => {
            console.log(error);
          });

        this.$store.dispatch("auth/setUser", null);
        this.$router.push("/login");
      },
    },
    // fetchはVuexのstore（stateの状態を保持するもの）の情報が完成しているタイミング
    fetch({
      store,
      redirect
    }) {
      // store.watch()は第一引数が返す値を監視し、値が変わったときに第二引数である関数を、コールバックとして呼び出します。
      store.watch(
        // 現在のログインユーザーの情報が変わったタイミングで、コールバックが呼び出される
        state => state.auth.currentUser,
        (newUser, oldUser) => {
          if (!newUser) {
            return redirect("/login");
          }
        }
      );
    },
  };

</script>

<style>
</style>
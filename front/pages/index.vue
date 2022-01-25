<template>
  <div v-if="user">
    <p>名前：{{user.name}}</p>
    <AddTodo @submit="addTodo" />
    <TodoList :todos="user.todos" />
  </div>
</template>

<script>
  import axios from "@/plugins/axios"
  // なくて良い、「@」はトップディレクトリ
  import AddTodo from "@/components/AddTodo";
  import TodoList from "@/components/TodoList";

  export default {
    // なくて良い
    components: {
      AddTodo,
      TodoList,
    },
    data() {
      return {
        todos: [
          {
            title: "test3",
            username: "太郎3"
          },
        ],
      };
    },
    computed: {
      user() {
        // 「$」は慣習的なもので、付けないものと差はない
        return this.$store.state.auth.currentUser;
      }
    },
    methods: {
      async addTodo(todo) {
        const { data } = await axios.post("/v1/todos", { todo });

        this.$store.dispatch("auth/setUser", {
          // スプレッド構文で展開。userの情報とTODOの情報をまとめて綺麗に1個のオブジェクトにして、Vuexのactionsに渡す
          // 例：{id: 1, name: 'テストユーザー', email: 't@nuxt.rails.todoapp', todos: Array(2)}で、user.idやuser.todosと言う形で呼び出せる
          // スプレッド構文で展開しないと、{user: {id: 1, name: 'テストユーザー', email: 't@nuxt.rails.todoapp'}, todos: Array(2)}のようになり、
          // IDを呼び出したい際などは、user.user.idのようになってしまう
          ...this.user,
          todos: [...this.user.todos, data]
        });
      },
    },
    fetch({
      store,
      redirect
    }) {
      store.watch(
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
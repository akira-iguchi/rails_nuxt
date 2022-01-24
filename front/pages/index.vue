<template>
  <div v-if="user">
    <p>名前：{{user.name}}</p>
    <AddTodo @submit="addTodo" />
    <TodoList :todos="todos" />
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
      async addTodo(title) {
        await axios.post("/v1/todos", { title });
        this.todos.push({
          title
        });
      },
    },
  };

</script>

<style>
</style>
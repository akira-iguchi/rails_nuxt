<template>
  <div>
    <AddTodo @submit="addTodo" />
    <TodoList :todos="todos" />
  </div>
</template>

<script>
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
    methods: {
      addTodo(title) {
        this.todos.push({
          title
        });
      },
    },
  };

</script>

<style>
</style>
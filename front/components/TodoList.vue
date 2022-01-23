<template>
  <v-card>
    <v-card-title>
      Todo List
      <v-spacer></v-spacer>
      <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="todos" :search="search"></v-data-table>
  </v-card>
</template>

<script>
export default {
  props: ["todos"],
  data() {
    return {
      // このtodosはpropsが優先なので表示されない
      // todos: [
      //   {
      //     title: "test",
      //     username: "太郎"
      //   },
      //   {
      //     title: "test2",
      //     username: "太郎2"
      //   }
      // ],
      search: "",
      headers: [
        {
          text: "タイトル",
          align: "left",
          sortable: false,
          value: "title"
        },
        { text: "ユーザー名",
          value: "username"
        }
      ]
    };
  }
};
</script>

<style>
</style>
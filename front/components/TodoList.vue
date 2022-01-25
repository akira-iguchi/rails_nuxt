<template>
  <v-card>
    <v-card-title>
      Todo List
      <v-spacer></v-spacer>
      <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="todos" :search="search">
      <template v-slot:[`item.action`]="{ item }">
        <v-icon small @click="deleteItem(item)">delete</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "@/plugins/axios";
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
        },
        {
          text: "Actions",
          value: "action",
        },
      ]
    };
  },
  computed: {
      user() {
        return this.$store.state.auth.currentUser;
      }
    },
    methods: {
      async deleteItem(item) {
        const res = confirm("本当に削除しますか？");
        if (res) {
          await axios.delete(`/v1/todos/${item.id}`);
          // 仮引数で指定しているitem（削除したいTODO）のIDと一致しないものだけでユーザーのTODOを構成し直す。
          const todos = this.user.todos.filter((todo) => {
            return todo.id !== item.id;
          });
          // スプレッド構文を用いて展開し、データの形を揃えた状態でVuexを書き換える
          const newUser = {
            ...this.user,
            todos,
          };
          this.$store.commit("auth/setUser", newUser);
        }
      },
    }
};
</script>

<style>
</style>
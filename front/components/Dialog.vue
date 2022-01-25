<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-icon class="icon" small v-bind="attrs" v-on="on">fas fa-edit</v-icon>
      </template>

      <v-card>
        <v-card-title class="text-h5 lighten-2">
          編集
        </v-card-title>

        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field v-model="title" counter="10" label="todo" required></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-btn @click="handleSubmit">更新</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    props: ["todo", "user", "isOpen"],
    data () {
      return {
        title: "",
        dialog: false
      }
    },
    mounted () {
      this.title = this.todo.title
    },
    methods: {
      handleSubmit() {
        const todo = {
          title: this.title,
          id: this.todo.id,
          user_id: this.user.id,
        };

        this.$emit("submit", todo);

        this.dialog = false
      },
    }
  }
</script>

<style>
.icon {
  position: relative;
  left: 20px;
}
</style>
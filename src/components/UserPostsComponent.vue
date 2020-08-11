<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                 <v-data-table
                    @page-count="pageCount = $event"
                    v-model="selected"
                    :headers="headers"
                    :page.sync="page"
                    :items="posts"
                    :items-per-page="itemsPerPage"
                    hide-default-footer
                    item-key="id"
                    show-select
                    sort-by="createdon"
                    class="elevation-10"
                    :loading="loading" loading-text="Loading... Please wait"
                >
                    <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>Posts</v-toolbar-title>
                        <v-divider
                        class="mx-4"
                        inset
                        vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          class="mb-2 mr-2"
                          @click="deleteMany"
                          :disabled="selected.length <= 1"
                          >
                          delete
                          </v-btn>
                        <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            to="/cms/dashboard"
                        >New Post
                        </v-btn>
                        <v-dialog v-model="dialog"
                         fullscreen hide-overlay transition="dialog-bottom-transition"
                        >
                        <v-card>
                            <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                            <v-container>
                                <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                    v-model="editedItem.title" label="name"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-select
                                    v-model="editedItem.category"
                                    label="role" :items="categories"></v-select>
                                </v-col>
                                <v-col cols="12" >
                                    <v-textarea
                                    v-model="editedItem.content" label="article"></v-textarea>
                                </v-col>
                                </v-row>
                            </v-container>
                            </v-card-text>

                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn
                            :disabled="!editedItem.title ||
                            !editedItem.category || !editedItem.content ||
                             editedItem.content.lengt > 2900
                            || editedItem.title.length > 25 "
                                 color="blue darken-1"
                                 text @click="save">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                        <v-row justify="center">
                          <v-dialog v-model="deleteDialog" persistent max-width="290">
                            <v-card>
                              <v-card-title class="headline">Delete?</v-card-title>
                              <v-card-text>
                                Are you sure you want to delete Post?</v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" text
                                @click="cancel">Cancel</v-btn>
                                <v-btn color="green darken-1"
                                text @click="ok">Ok</v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-row>
                    </v-toolbar>
                    </template>
                    <template v-slot:item.actions="{ item }">
                    <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                    >
                        mdi-pencil
                    </v-icon>
                    <v-icon
                        small
                        @click="deleteItem(item)"
                    >
                        mdi-delete
                    </v-icon>
                    </template>
                    <template v-slot:no-data>
                    <v-btn color="primary">Reset</v-btn>
                    </template>
            </v-data-table>
            <v-pagination
              class="pagination--view"
              v-model="page"
              :length="pageCount"
              circle
            ></v-pagination>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import moment from 'moment';
import { postsCollection } from '../firebaseConfig';

export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      posts: [],
      loading: false,
      deleteDialog: false,
      dialog: false,
      itemToDelete: {},
      singleSelect: false,
      selected: [],
      categories: [
        'Leisure',
        'Tech',
        'Entertainment',
      ],
      headers: [
        {
          text: 'Title',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        { text: 'Content', value: 'content' },
        { text: 'ID', value: 'id' },
        { text: 'Category', value: 'category' },
        { text: 'CreatedOn', value: 'createdon' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        title: '',
        content: '',
        category: '',
        createdOn: '',
      },
      defaultItem: {
        title: '',
        content: '',
        category: '',
        createdOn: '',
      },
    };
  },
  async created() {
    this.loading = true;
    this.$store.commit('OVERLAY_ON');
    const docRef = await postsCollection.where('author_id', '==', this.$store.state.currentUser.uid).get();
    docRef.forEach((doc) => {
      this.posts.push({
        id: doc.id,
        title: doc.data().title.toUpperCase(),
        content: doc.data().content.length > 200 ? doc.data().content.substring(0, 200).concat('...')
          : doc.data().content,
        category: doc.data().category,
        createdon: this.formatDate(doc.data().createdOn.seconds),
      });
    });

    setTimeout(() => {
      this.loading = false;
      this.$store.commit('OVERLAY_OFF');
    }, 3000);
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },

    pages() {
      return (
        this.commentsData.length > 10
          ? Math.ceil(this.commentsData.length / 5) : 1);
    },
  },

  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close();
    },
  },

  filters: {
    formatDate(date) {
      return moment(date).format('MMMM Do YY, h:mm:ss a');
    },
    upperCase(value) {
      return value.toUpperCase();
    },
  },

  methods: {

    editItem(item) {
      this.editedIndex = this.posts.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    },

    deleteItem(item) {
      this.deleteDialog = true;
      this.itemToDelete = item;
    },

    cancel() {
      this.deleteDialog = false;
      this.itemToDelete = {};
    },

    async ok() {
      try {
        await this.$store.dispatch('deletePost', this.itemToDelete.id);
        const index = this.posts.indexOf(this.itemToDelete);
        this.posts.splice(index, 1);
        this.deleteDialog = false;
      } catch (error) {
        this.deleteDialog = false;
      }
    },

    formatDate(date) {
      const newDate = date * 1000;
      return moment(newDate).format('MMMM Do YY, h:mm:ss a');
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    async save() {
      console.log(this.editedItem.id);
      if (this.editedIndex > -1) {
        await this.$store.dispatch('updatePost', this.editedItem);
        Object.assign(this.posts[this.editedIndex], this.editedItem);
      } else {
        this.posts.push(this.editedItem);
      }
      this.close();
    },

    deleteMany() {
      console.log(this.selected);
    },
  },
};
</script>

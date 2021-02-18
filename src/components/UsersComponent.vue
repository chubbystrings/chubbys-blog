<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                 <v-data-table
                    @page-count="pageCount = $event"
                    :page.sync="page"
                    :items-per-page="itemsPerPage"
                    hide-default-footer
                    v-model="selected"
                    single-select
                    :headers="headers"
                    :items="users"
                     item-key="id"
                    show-select
                    sort-by="createdon"
                    class="elevation-10"
                    :loading="loading" loading-text="Loading... Please wait"
                >
                    <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>Users</v-toolbar-title>
                        <v-divider
                        class="mx-4"
                        inset
                        vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          class="mb-2 mr-2"
                          @click="suspendBtn"
                          :disabled="selected.length === 0 || selected.length > 1"
                          >
                          {{ reactivate ? 'suspend' : 'reactivate' }}
                          </v-btn>
                        <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            to="/cms/create-user"
                        >New User
                        </v-btn>
                        <v-dialog v-model="dialog" max-width="500px" style="z-index: 1500">
                        <v-card>
                            <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                            <v-container>
                                <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                    v-model="editedItem.firstname"
                                     label="firstname"></v-text-field>
                                </v-col>
                                 <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                    v-model="editedItem.lastname"
                                     label="lastname"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-select
                                      v-model="editedItem.role"
                                      label="role"
                                      :items="roles"
                                    >
                                    </v-select>
                                </v-col>
                                </v-row>
                            </v-container>
                            </v-card-text>

                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn
                            :disabled="!editedItem.firstname ||
                            !editedItem.role || !editedItem.lastname "
                                 color="blue darken-1"
                                 text @click="save">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                        <v-row justify="center">
                          <v-dialog v-model="suspendDialog" persistent max-width="290">
                            <v-card>
                              <v-card-title class="headline">{{ userToSuspend }}?</v-card-title>
                              <v-card-text>
                                Are you sure you want to {{ userToSuspend}} User?</v-card-text>
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
import { usersCollection } from '../firebaseConfig';

export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      users: [],
      loading: false,
      dialog: false,
      suspendDialog: false,
      userToSuspend: '',
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: 'Firstname',
          align: 'start',
          sortable: false,
          value: 'firstname',
        },
        {
          text: 'Lastname',
          align: 'start',
          sortable: false,
          value: 'lastname',
        },
        { text: 'Id', value: 'id' },
        { text: 'Role', value: 'role' },
        { text: 'Email', value: 'email' },
        { text: 'Isactive', value: 'isactive' },
        { text: 'CreatedOn', value: 'createdOn' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        firstname: '',
        lastname: '',
        role: '',
        email: '',
        isactive: '',
        id: '',
        createdOn: '',
      },
      defaultItem: {
        firstname: '',
        lastname: '',
        role: '',
        email: '',
        isactive: '',
        id: '',
        createdOn: '',
      },
      roles: [
        'admin',
        'superuser',
      ],
    };
  },
  async created() {
    this.$store.commit('OVERLAY_ON');
    this.loading = true;
    const superuser = [];
    const docRef = await usersCollection.get();
    docRef.forEach((doc) => {
      if (doc.data().role === 'admin') {
        this.users.push({
          firstname: doc.data().name.split(' ')[0],
          lastname: doc.data().name.split(' ')[1],
          role: doc.data().role,
          email: doc.data().email,
          isactive: doc.data().isactive,
          id: doc.data().id,
          createdOn: this.formatDate(doc.data().createdOn.seconds),
        });
      } else {
        superuser.push({
          firstname: doc.data().name.split(' ')[0],
          lastname: doc.data().name.split(' ')[1],
          role: doc.data().role,
          email: doc.data().email,
          isactive: doc.data().isactive,
          id: doc.data().id,
          createdOn: this.formatDate(doc.data().createdOn.seconds),
        });
      }
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

    reactivate() {
      const row = this.selected[0];
      if (!row) {
        return true;
      }
      if (row && row.isactive === true) {
        return true;
      }
      return false;
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

    suspendBtn() {
      if (this.selected[0].isactive === true) {
        this.userToSuspend = 'Suspend';
      } else {
        this.userToSuspend = 'Reactivate';
      }
      this.suspendDialog = true;
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    },

    deleteItem(item) {
      this.suspendDialog = true;
      this.userToSuspend = item;
    },

    cancel() {
      this.suspendDialog = false;
    },

    async ok() {
      this.userToSuspend = '';
      this.suspendDialog = false;
      if (this.selected[0].isactive === true) {
        const userIndex = this.users.indexOf(this.selected[0]);
        this.users[userIndex].isactive = !this.users[userIndex].isactive;
        this.$store.dispatch('suspendUser', this.selected[0].id);
      } else {
        const userIndex = this.users.indexOf(this.selected[0]);
        this.users[userIndex].isactive = !this.users[userIndex].isactive;
        this.$store.dispatch('reactivateUser', this.selected[0].id);
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

    save() {
      if (this.editedIndex > -1) {
        try {
          this.$store.dispatch('editUser', this.editedItem);
          Object.assign(this.users[this.editedIndex], this.editedItem);
        } catch (error) {
          this.users.push(this.editedItem);
        }
      } else {
        this.users.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

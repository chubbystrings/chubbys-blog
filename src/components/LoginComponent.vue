<template>
 <v-container
    fluid
  >
    <v-row
    >
      <v-col
        cols="12"
      >
        <v-card class="elevation-12 mx-auto pa-auto"  style="width: 25rem;">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title class="white--text">Login</v-toolbar-title>
            <v-spacer />
            </v-toolbar>
              <p  class="ml-3 redColor"></p>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    label="E-mail"
                    name="email"
                    type="text"
                    required
                    @blur="$v.email.$touch()"
                  />

                  <v-text-field
                  v-model="password"
                  :error-messages="passwordErrors"
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    @blur="$v.email.$touch()"
                    :disabled="!$v.email.email || !email"
                  />
                  <v-spacer/>
                  <v-card-actions>
                  <base-btn
                  :disabled="$v.$anyError || !email || !password"
                  class="btnSubmit"
                  type="submit"
                  color="primary">Login</base-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { required, minLength, email } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import { auth, usersCollection } from '../firebaseConfig';
import Admin from '../services/admin';

export default {
  mixins: [validationMixin],
  validations: {
    password: { required, minLength: minLength(8) },
    email: { required, email },
  },

  data: () => ({
    password: '',
    email: '',
  }),

  computed: {
    ...mapState(['currentUser']),
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      if (!this.$v.email.email) errors.push('Must be valid e-mail');
      if (!this.$v.email.required) errors.push('E-mail is required');
      return errors;
    },

    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      if (!this.$v.password.required) errors.push('password is required.');
      return errors;
    },

  },

  methods: {
    login() {
      this.$store.commit('OVERLAY_ON');
      auth.signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          usersCollection.doc(user.user.uid).get().then((res) => {
            if (res.data().isactive === false) {
              this.$store.dispatch('clearData');
              const alert = {
                alert: true,
                type: 'error',
                message: 'this account has been suspended',
              };
              this.$store.commit('OVERLAY_OFF');
              this.$store.commit('SET_ALERT', alert);
            } else {
              this.$store.commit('SET_CURRENT_USER', user.user);
              this.$store.commit('SET_USER_PROFILE', res.data());
              Admin.getToken()
                .then((idToken) => {
                  this.$store.commit('SET_USER_TOKEN', idToken);
                  Admin.find_user_by_id(user.user.uid)
                    .then((response) => {
                      this.$router.push({ name: 'Dashboard' });
                      const alert = {
                        alert: true,
                        type: 'success',
                        message: `Welcome ${response.name} you are signed in as ${response.role} `,
                      };
                      this.$store.commit('OVERLAY_OFF');
                      this.$store.commit('SET_ALERT', alert);
                    });
                })
                .catch((error) => {
                  console.log(error);
                  const alert = {
                    alert: true,
                    type: 'error',
                    message: error.code ? error.message : error,
                  };
                  this.$store.commit('OVERLAY_OFF');
                  this.$store.commit('SET_ALERT', alert);
                });
            }
          }).catch((err) => {
            console.log(err);
            const alert = {
              alert: true,
              type: 'error',
              message: err.code ? err.message : err,
            };
            this.$store.commit('OVERLAY_OFF');
            this.$store.commit('SET_ALERT', alert);
          });
        }).catch((err) => {
          console.log(err);
          const alert = {
            alert: true,
            type: 'error',
            message: err.code ? err.message : 'User has been suspended!!',
          };
          this.$store.commit('OVERLAY_OFF');
          this.$store.commit('SET_ALERT', alert);
        });
    },
    clear() {
      this.$v.$reset();
      this.name = '';
      this.email = '';
      this.message = '';
    },
  },
};
</script>
<style scoped>
.redColor {
  color: red;
}
.btnSubmit {
  position: absolute;
  right: 1rem;
  bottom: 0.4rem;
}

.centered {
  display: flex;
  align-items: center;
}
</style>

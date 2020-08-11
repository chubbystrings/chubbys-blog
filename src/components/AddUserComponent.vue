<template>
  <v-container
    fluid
  >
    <v-row
    >
      <v-col
      cols="12"
      >
       <v-card class="elevation-12 mx-auto pa-auto"  style="width: 20rem; height: 26rem">
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>AddUSer</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text>
        <v-form>
        <v-text-field
          dense
          v-model="firstName"
          :error-messages="fnameErrors"
          label="Firstname"
          required
          @input="$v.firstName.$touch()"
          @blur="$v.firstName.$touch()"
        ></v-text-field>
         <v-text-field
          dense
          v-model="lastName"
          :error-messages="lnameErrors"
          label="Lastname"
          required
          @input="$v.lastName.$touch()"
          @blur="$v.lastName.$touch()"
        ></v-text-field>
        <v-text-field
          dense
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
          <v-text-field
          dense
          type="password"
          v-model="password"
          :error-messages="passwordErrors"
          label="Password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>
         <v-select
          dense
          v-model="roleSelect"
          :items="role"
          :error-messages="roleSelectErrors"
          label="Role"
          required
          @change="$v.roleSelect.$touch()"
          @blur="$v.roleSelect.$touch()"
        ></v-select>
        <base-btn
        class="submitBtn"
        :disabled="$v.$anyError || !checkForm"
        color="primary"
        @click.enter="signup"
        >submit</base-btn>
      </v-form>
  </v-card-text>
    </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable no-unused-expressions */
import { validationMixin } from 'vuelidate';
import {
  required, minLength, maxLength, email,
} from 'vuelidate/lib/validators';
import { mapState } from 'vuex';

export default {
  mixins: [validationMixin],

  validations: {
    firstName: { required, maxLength: maxLength(10) },
    lastName: { required, maxLength: maxLength(10) },
    email: { required, email },
    password: { required, minLength: minLength(7) },
    roleSelect: { required },
  },

  data: () => ({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roleSelect: null,
    role: [
      'admin',
      'superuser',
    ],
  }),

  computed: {
    ...mapState(['userProfile']),
    roleSelectErrors() {
      const errors = [];
      if (!this.$v.roleSelect.$dirty) return errors;
      if (!this.$v.roleSelect.required) errors.push('Gender is required');
      return errors;
    },
    fnameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      if (!this.$v.firstName.maxLength) errors.push('Name must be at most 10 characters long');
      if (!this.$v.firstName.required) errors.push('Name is required.');
      return errors;
    },
    lnameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      if (!this.$v.lastName.maxLength) errors.push('Name must be at most 10 characters long');
      if (!this.$v.lastName.required) errors.push('Name is required.');
      return errors;
    },
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
      if (!this.$v.password.minLength) errors.push('Must be more than & characters');
      if (!this.$v.password.required) errors.push('E-mail is required');
      return errors;
    },
    checkForm() {
      // eslint-disable-next-line max-len
      if (!this.firstName || !this.lastName || !this.email || !this.password || !this.roleSelect) return false;
      return true;
    },
  },

  methods: {

    signup() {
      // create user obj
      const data = {
        name: `${this.firstName} ${this.lastName}`,
        email: this.email,
        password: this.password,
        role: this.roleSelect,
      };

      this.$store.dispatch('addUser', data);
    },
    clear() {
      this.$v.$reset();
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.roleSelect = null;
    },
  },
  components: {
  },
};
</script>
<style scoped>
.redColor {
  color: red;
}
.submitBtn {
  position: absolute;
  right: 1rem;
}
</style>

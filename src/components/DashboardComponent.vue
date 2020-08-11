<template>
    <v-container>
        <v-row
        >
        <v-col cols="4">
            <v-card
            elevation="10"
            >
                <v-card-title>
                    <span class="headline text-center">Edit Article</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                dense
                                v-model="title"
                                :counter="25"
                                :error-messages="titleRules"
                                label="Title"
                                prepend-icon="mdi-pencil"
                                required
                                @change="$v.title.$touch()"
                                @blur="$v.title.$touch()"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea
                                dense
                                    v-model="content"
                                    :error-messages="contentRules"
                                    class="mx-2"
                                    label="Article"
                                    rows="4"
                                    clearable
                                    prepend-icon="mdi-comment-text-outline"
                                    :counter="6000"
                                    @change="$v.content.$touch()"
                                    @blur="$v.content.$touch()"
                                ></v-textarea>
                            </v-col>
                            <v-col>
                                <v-select
                                dense
                                    v-model="select"
                                    :items="items"
                                    :error-messages="selectRules"
                                    label="Category"
                                    required
                                    @change="$v.select.$touch()"
                                    @blur="$v.select.$touch()"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary"
                    :disabled="$v.$anyError || !content || !title || !select"
                    text @click="submit">Post</v-btn>
                    </v-card-actions>
                </v-card>

            </v-col>
            <v-col cols="8">
                <v-card
                style="overflow-y: auto !important"
                class="fill-height fullWidth"
                elevation="10"
                s
                >
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-card-title>{{title.toUpperCase()}}</v-card-title>
                        </v-col>
                        <v-col cols="12">
                          <v-card-text>{{content}}</v-card-text>
                        </v-col>
                      </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapState } from 'vuex';
import { validationMixin } from 'vuelidate';
import {
  required, maxLength,
} from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],
  validations: {
    title: { required, maxLength: maxLength(25) },
    content: { required, maxLength: maxLength(6000) },
    select: { required },
  },
  data() {
    return {
      content: '',
      title: '',
      select: '',
      items: ['Leisure', 'Tech', 'Entertaiment'],
    };
  },
  computed: {
    ...mapState(['userProfile']),
    contentRules() {
      const errors = [];
      if (!this.$v.content.$dirty) return errors;
      if (!this.$v.content.maxLength) errors.push('Article must be at most 6000 characters long');
      if (!this.$v.content.required) errors.push('Article is required.');
      return errors;
    },
    titleRules() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      if (!this.$v.title.maxLength) errors.push('Title must be at most 10 characters long');
      if (!this.$v.title.required) errors.push('Title is required.');
      return errors;
    },
    selectRules() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      if (!this.$v.select.required) errors.push('Category is required.');
      return errors;
    },
  },
  methods: {
    submit() {
      const postData = {
        title: this.title.toUpperCase(),
        content: this.content,
        category: this.select,
        userId: this.$store.state.currentUser.uid,
        userName: this.$store.state.userProfile.name,
      };
      this.$store.dispatch('createPost', postData);
    },
  },
};
</script>
<style scoped>
.fullWidth {
    width: 100%;
}
.scroll {
  overflow: auto !important
}
</style>

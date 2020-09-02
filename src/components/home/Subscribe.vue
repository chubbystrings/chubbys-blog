<template>
  <v-container
    id="subscribe"
    tag="section"
  >
    <base-card
      color="secondary"
      class="pa-3"
    >
      <v-container>
        <v-row>

          <v-col
            cols="12"
            md="6"
            offset-md="1"
          >
            <base-subheading>Contact</base-subheading>

            <v-list class="transparent">
              <v-list-item>
                <v-list-item-avatar
                  color="primary"
                >
                  <v-icon
                    class="elevation-4"
                    dark
                  >
                    mdi-email-outline
                  </v-icon>
                </v-list-item-avatar>

                <v-list-item-title>EMAIL</v-list-item-title>

                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-list-item-subtitle v-bind="attrs" v-on="on">
                        emekaokwor@outlook.com
                      </v-list-item-subtitle>
                    </template>
                    <span>emekaokwor@outlook.com</span>
                  </v-tooltip>
              </v-list-item>

              <v-list-item>
                <v-list-item-avatar color="primary">
                  <v-icon
                    class="elevation-4"
                    dark
                  >
                    mdi-map-marker
                  </v-icon>
                </v-list-item-avatar>

                <v-list-item-title>ADDRESS</v-list-item-title>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-list-item-subtitle v-bind="attrs" v-on="on">
                        Festac Lagos, Nigeria
                      </v-list-item-subtitle>
                    </template>
                    <span>Festac Lagos, Nigeria</span>
                  </v-tooltip>
              </v-list-item>

              <v-list-item>
                <v-list-item-avatar color="primary">
                  <v-icon
                    class="elevation-4"
                    dark
                  >
                    mdi-phone
                  </v-icon>
                </v-list-item-avatar>

                <v-list-item-title>PHONE</v-list-item-title>

                 <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-list-item-subtitle v-bind="attrs" v-on="on">
                        +234-8163955616
                      </v-list-item-subtitle>
                    </template>
                    <span>+234-8163955616</span>
                  </v-tooltip>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </base-card>
  </v-container>
</template>

<script>
export default {
  name: 'HomeSubscribe',
  data: () => ({
    show: false,
  }),
};
</script>

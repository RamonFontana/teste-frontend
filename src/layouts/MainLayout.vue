<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="header">
          <router-link to="/" class="logo">Take5Teste</router-link>
          <div class="languages">
            <q-btn class="btn">
              <q-img
                src="https://localusteama.colliers.com/hubfs/brazil.png"
                class="img"
                @click="changeLanguage('pt')"
              />
            </q-btn>
            <q-btn class="btn" @click="changeLanguage('en')">
              <q-img
                src="https://pt.seaicons.com/wp-content/uploads/2015/08/United-kingdom-icon.png"
                class="img"
              />
            </q-btn>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { mapState, mapMutations } from "vuex";

export default defineComponent({
  name: "MainLayout",

  computed: {
    ...mapState("languages", ["language"]),
  },

  setup() {
    return {};
  },
  methods: {
    ...mapMutations("languages", ["changeLanguage"]),
  },
});
</script>

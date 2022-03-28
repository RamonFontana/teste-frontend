<template>
  <q-page>
    <div class="col-12 full-width">
      <div class="row">
        <div class="col-md-8 search">
          <q-input
            bottom-slots
            v-model="textSearch"
            :label="
              language == 'pt' ? portuguese.labelSearch : english.labelSearch
            "
            :dense="dense"
            @keyup="filterPokemons"
          >
            <template v-slot:append>
              <q-icon
                v-if="textSearch !== ''"
                name="close"
                @click="
                  textSearch = '';
                  this.pokeSearch = {};
                "
                class="cursor-pointer"
              />
            </template>
          </q-input>
        </div>
      </div>
    </div>

    <div
      v-if="this.pokeSearch[0] != undefined"
      class="flex-wrap row flex-center"
    >
      <q-card
        class="poke-card col-auto"
        v-for="(item, key) in this.pokeSearch"
        :key="key"
      >
        <q-card-section class="text-center">
          <div class="img">
            <q-img
              src="https://w7.pngwing.com/pngs/620/521/png-transparent-poke-ball-pokemon-pokemon-rim-mobile-phones-pokemon.png"
            />
          </div>
          <div class="text-h6">{{ item.name }}</div>
          <div class="text-subtitle2">
            {{
              item.url
                .substring(item.url.lastIndexOf("/") - 3)
                .replaceAll("/", "")
                .replace("n", "")
            }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions vertical>
          <q-btn flat>
            <router-link :to="'/pokemon/' + item.name">{{
              language == "pt" ? portuguese.seePokemon : english.seePokemon
            }}</router-link>
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div v-else class="flex-wrap row flex-center">
      <q-card
        class="poke-card col-auto"
        v-for="(item, key) in this.pokeList"
        :key="key"
      >
        <q-card-section class="text-center">
          <div class="img">
            <q-img
              src="https://w7.pngwing.com/pngs/620/521/png-transparent-poke-ball-pokemon-pokemon-rim-mobile-phones-pokemon.png"
            />
          </div>
          <div class="text-h6">{{ item.name }}</div>
          <div class="text-subtitle2">
            {{
              item.url
                .substring(item.url.lastIndexOf("/") - 3)
                .replaceAll("/", "")
                .replace("n", "")
            }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions vertical>
          <q-btn flat>
            <router-link :to="'/pokemon/' + item.name">{{
              language == "pt" ? portuguese.seePokemon : english.seePokemon
            }}</router-link>
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { mapState } from "vuex";
import api from "../../services/api";

export default defineComponent({
  name: "IndexPage",

  beforeMount() {
    api
      .get("pokemon?limit=151")
      .then((response) => {
        this.pokeList = response.data.results;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  data() {
    return {
      pokeList: {},
      pokeSearch: {},
    };
  },
  computed: {
    ...mapState("languages", ["language", "portuguese", "english"]),
  },
  setup() {
    return {
      textSearch: ref(""),
      ph: ref(""),
      dense: ref(false),
    };
  },
  methods: {
    filterPokemons() {
      this.pokeSearch = this.pokeList.filter((pokemon) => {
        if (!pokemon.name.indexOf(this.textSearch)) {
          return pokemon;
        } else if (this.textSearch == "") {
          this.pokeSearch = {};
        }
      });
    },
  },
});
</script>

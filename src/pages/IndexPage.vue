<template>
  <q-page class="row">
    <div class="col-md-7 search">
      <q-input
        bottom-slots
        v-model="textSearch"
        :label="language == 'pt' ? portuguese.labelSearch : english.labelSearch"
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
    <div class="col-md-4 category">
      <h2>Filtrar por tipo de Pokemon</h2>
      <q-btn
        class="btn"
        v-for="(name, key) in this.typePoke"
        :key="name"
        :id="'pokeType' + key"
        @click="filterPokemonsByType(key)"
        >{{
          language == "pt"
            ? portuguese.typePoke[key].label
            : english.typePoke[key].label
        }}</q-btn
      >
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
        console.log(response);
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
      typePoke: [
        "normal",
        "fighting",
        "flying",
        "poison",
        "ground",
        "rock",
        "bug",
        "ghost",
        "steel",
        "fire",
        "water",
        "grass",
        "electric",
        "psychic",
        "ice",
        "dragon",
        "dark",
        "fairy",
        "unknown",
        "shadow",
      ],
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
          return {};
        }
      });
    },
    filterPokemonsByType(id) {
      let elems = document.querySelectorAll(".category .btn");
      [].forEach.call(elems, function (el) {
        el.className = el.className.replace(/\bactive\b/, "");
      });
      let typeElem = document.getElementById("pokeType" + id);
      typeElem.classList.add("active");
      api
        .get("type/" + id)
        .then((response) => {
          this.pokeSearch = response.data.pokemon.map((item) => {
            return { name: item.pokemon.name, url: item.pokemon.url };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>

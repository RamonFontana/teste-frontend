<template>
  <q-page class="flex-wrap collunm flex-center">
    <div class="pokemon">
      <q-img :src="this.url" />
      <h1>{{ $route.params.name }}</h1>
    </div>
    <div class="text-center">
      <h2>{{ language == "pt" ? portuguese.info : english.info }}</h2>
      <div class="weight">
        <p>
          {{ language == "pt" ? portuguese.weightLabel : english.weightLabel }}:
          {{ weight.toFixed(2) }} Lb
        </p>
        <p>
          {{
            language == "pt" ? portuguese.weightKgLabel : english.weightKgLabel
          }}: {{ weightKg.toFixed(2) }} Kg
        </p>
        <p>
          {{ language == "pt" ? portuguese.heightLabel : english.heightLabel }}:
          {{ height.toFixed(2) }} Ft
        </p>
        <p>
          {{
            language == "pt" ? portuguese.heightMLabel : english.heightMLabel
          }}: {{ heightM.toFixed(2) }} M
        </p>
      </div>
    </div>
    <div class="habilities">
      <div class="row">
        <div class="col-6">
          <h2>
            {{ language == "pt" ? portuguese.habilities : english.habilities }}
          </h2>
          <ul>
            <li v-for="(item, key) in this.habilities" :key="key">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="col-6">
          <h2>{{ language == "pt" ? portuguese.movies : english.movies }}</h2>
          <ul>
            <li v-for="(item, key) in this.moves" :key="key">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import api from "../../services/api";
import { mapState } from "vuex";

export default defineComponent({
  name: "PagePokemon",

  beforeMount() {
    api
      .get("pokemon/" + this.$route.params.name)
      .then((response) => {
        console.log(response);
        this.name = response.data.name;
        this.url = response.data.sprites.other.dream_world.front_default;
        response.data.abilities.map((item) => {
          this.habilities.push(item.ability.name);
        });
        response.data.moves.map((item) => {
          this.moves.push(item.move.name);
        });
        this.weight = response.data.weight;
        this.weightKg = response.data.weight / 2.2046;
        this.height = response.data.height;
        this.heightM = response.data.height / 3.2808;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  computed: {
    ...mapState("languages", ["language", "portuguese", "english"]),
  },

  data() {
    return {
      name: "",
      url: "",
      habilities: [],
      moves: [],
      weight: 0,
      weightKg: 0,
      height: 0,
      heightM: 0,
    };
  },
});
</script>

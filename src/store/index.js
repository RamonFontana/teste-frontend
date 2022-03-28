import { createStore } from "vuex";
import languages from "./languages";

export default function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      languages,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
}

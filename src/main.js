import { createApp } from 'vue'
import App from './App.vue'
//import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router/index'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'mdi', // 追加
  },
  theme: {
    light: true,
    themes: {
      light: {
        primary: '#0078bd',
        secondary: '#5fc8ce',
        accent: '#ff6b6b',
        error: '#b71c1c',
        background: "#f5f5f5",
      },
    },
  },
})

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')


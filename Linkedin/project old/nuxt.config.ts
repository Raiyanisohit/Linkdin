// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  


  modules: [

  "@nuxtjs/tailwindcss", '@pinia/nuxt',
  
  ],

  devtools: { enabled: true },



  css: ['~/assets/css/main.css'],
  components: [
    {
      path: '~/components',
  pathPrefix: false,
    },
  ],
 
  app: {  
    head: {
      
      title: "LinkedIn",
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'https://cdn-icons-png.flaticon.com/128/3536/3536505.png' },
        {
          rel: "stylesheet",
          integrity:
            "sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC",
          crossorigin: "anonymous",
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
        },
      ],
      script: [
        {
          integrity:
            "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM",
          crossorigin: "anonymous",
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
          body: true,
        },

      ],
    },
  },
  
ssr:false,

  // 
});

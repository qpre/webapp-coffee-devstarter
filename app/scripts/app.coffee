requirejs.config({
    baseUrl: "extern",
    paths: {
      "app": "../scripts/app",
      'jquery': 'jquery/jquery'
    }
})

requirejs(["app/main"])
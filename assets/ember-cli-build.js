'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const autoprefixer = require('autoprefixer');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      extension: 'sass'
    },

    'ember-bootstrap': {
      'bootstrapVersion': 4,
      'importBootstrapFont': false,
      'importBootstrapCSS': false
    },

    postcssOptions: {
      compile: { enabled: false },
      filter: {
        enabled: true,
        plugins: [ { module: autoprefixer } ]
      }
    }
  });

  app.import('node_modules/@fortawesome/fontawesome-free/css/solid.css');
  app.import('node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot', {
    destDir: 'webfonts'
  });
  app.import('node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf', {
    destDir: 'webfonts'
  });
  app.import('node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff', {
    destDir: 'webfonts'
  });
  app.import('node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2', {
    destDir: 'webfonts'
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};

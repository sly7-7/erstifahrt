import EmberRouter from '@ember/routing/router';
import config from './config/environment';

class Router extends EmberRouter {
  location = config.locationType
  rootURL = config.rootURL
}

Router.map(function() {
  this.route('login');

  this.route('authenticated', { path: '/' }, function() {
    this.route('students', { path: '/', resetNamespace: true });
    this.route('trip', { path: '/aktuelle-fahrt', resetNamespace: true });
    this.route('lists', { path: '/drucken/:target', resetNamespace: true })
  });
});

export default Router;

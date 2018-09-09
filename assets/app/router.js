import EmberRouter from '@ember/routing/router';
import config from './config/environment';

class Router extends EmberRouter {
  location = config.locationType
  rootURL = config.rootURL
}

Router.map(function() {
  this.route('login');

  this.route('students', { path: '/' });
  this.route('trip', { path: '/aktuelle-fahrt' });
  this.route('lists', { path: '/drucken/:target' })
});

export default Router;

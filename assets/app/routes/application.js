import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  moment: service(),

  beforeModel() {
    this.get('moment').setLocale('de')
  },

  routeAfterAuthentication: 'students',
});

import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

import { service } from '@ember-decorators/service';

class ApplicationRoute extends Route {
  @service moment

  beforeModel() {
    this.get('moment').setLocale('de')
  }
}

ApplicationRoute.reopen(ApplicationRouteMixin);

export default ApplicationRoute;

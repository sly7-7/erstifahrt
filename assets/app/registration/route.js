import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class RegistrationRoute extends Route {
  @service flashMessages;

  queryParams = {
    activated: {
      refreshModel: true,
    },
  };

  beforeModel(transition) {
    if (transition.to.queryParams.activated) {
      this.flashMessages.success('Got activated');
      this.replaceWith({ queryParams: { activated: false } });
    }
  }

  model(params) {
    return this.store.findRecord('student', params.student_id);
  }
}

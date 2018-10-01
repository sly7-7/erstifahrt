import Route from '@ember/routing/route';

export default class RegistrationRoute extends Route {
  model(params) {
    return this.store.findRecord('student', params.student_id);
  }
}

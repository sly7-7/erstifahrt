import Route from '@ember/routing/route';

export default class RegisterRoute extends Route {
  async model() {
    const trip = (await this.store.findAll('trip')).firstObject;

    return this.store.createRecord('student', { trip });
  }
}

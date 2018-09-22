import Route from '@ember/routing/route';

export default class RegisterRoute extends Route {
  async model() {
    const trips = await this.store.findAll('trip');
    return trips.firstObject;
  }
}
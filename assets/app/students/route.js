import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    const trip = (await this.store.findAll('trip')).firstObject;
    return trip;
  }
});

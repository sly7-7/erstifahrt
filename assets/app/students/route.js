import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    const trip = (await this.store.findAll('trip', { include: 'students' })).firstObject;
    return trip;
  }
});

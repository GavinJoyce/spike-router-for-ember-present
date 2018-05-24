import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    let models = await this.store.findAll('mascot');

    return Em.RSVP.hash({
      beta: models.find(model => model.id === '44'),
      runner: models.find(model => model.id === '45'),
      canary: models.find(model => model.id === '46'),
    })
  }
});

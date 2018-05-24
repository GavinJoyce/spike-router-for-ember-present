import Route from '@ember/routing/route';

export default Route.extend({
  model({ id }) {
    return this.modelFor('route-transitions').find(model => model.id === id);
  }
});

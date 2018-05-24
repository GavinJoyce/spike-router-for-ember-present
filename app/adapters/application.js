import DS from 'ember-data';
import ENV from 'spike-router-for-ember-present/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: ENV.rootURL,
  namespace: '/api'
});

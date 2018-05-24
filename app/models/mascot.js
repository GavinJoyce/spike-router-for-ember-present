import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  title: DS.attr(),
  imageURL: DS.attr(),
  introducedDate: DS.attr(),
});

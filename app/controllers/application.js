import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { on } from '@ember/object/evented';
import { EKMixin as EmberKeyboard, keyUp } from 'ember-keyboard';

export default Controller.extend(EmberKeyboard, {
  slides: inject(),

  init() {
    this._super(...arguments);
    this.set('keyboardActivated', true);
  },

  onLeft: on(keyUp('ArrowLeft'), function() {
    this.get('slides').previous();
  }),

  onRight: on(keyUp('ArrowRight'), keyUp('Space'), keyUp('Enter'), function() {
    this.get('slides').next();
  })
});

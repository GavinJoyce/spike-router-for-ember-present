import Controller from '@ember/controller';
import move from 'ember-animated/motions/move';
import scale from 'ember-animated/motions/scale';

export default Controller.extend({
  duration: 800,

  transition: function * ({ sentSprites }) {
    sentSprites.forEach(sprite => {
      sprite.applyStyles({
        zIndex: 1
      });
      scale(sprite);
      move(sprite);
    });
  }
});

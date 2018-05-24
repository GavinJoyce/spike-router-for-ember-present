import Controller from '@ember/controller';
import { toLeft, toRight } from 'ember-animated/transitions/move-over';
export default Controller.extend({
  rules({ oldItems, newItems }) {
    if (oldItems[0] < newItems[0]) {
      return toLeft;
    } else {
      return toRight;
    }
  },

  counter: 20,
  showBoth: true,
  actions: {
    increment() {
      this.set('counter', this.get('counter') + 1);
    },
    decrement() {
      this.set('counter', this.get('counter') - 1);
    }

  }
});

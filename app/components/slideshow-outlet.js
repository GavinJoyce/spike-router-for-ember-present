import Component from '@ember/component';
import { slideTransitionDuration, transitions } from 'spike-router-for-ember-present/router';

export default Component.extend({
  duration: slideTransitionDuration,

  rules: function({ newItems, oldItems }) {
    let oldRoute = oldItems[oldItems.length - 1];
    let newRoute = newItems[newItems.length - 1];
    let oldRouteName, newRouteName;
    if (oldRoute) {
      oldRouteName = oldRoute.outlets.main.render.name;
    }
    if (newRoute) {
      newRouteName = newRoute.outlets.main.render.name;
    }

    let transition = transitions.find(t => t.from === oldRouteName && t.to === newRouteName);
    if (transition) {
      return transition.use;
    }

    transition = transitions.find(t => t.to === oldRouteName && t.from === newRouteName);
    if (transition) {
      return transition.reverse || transition.use;
    }

  }

});

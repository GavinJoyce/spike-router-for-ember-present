import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { inject as service } from '@ember/service';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  slides: service('slides'),

  _buildDSL() {
    let dsl = this._super(...arguments);

    let slides = this.get('slides');

    dsl.__proto__.slide = function() {
      let name = arguments[0];
      let config = arguments[1]; //TODO: GJ: this should be optional
      let parent = this.parent;
      let path;

      if (parent === 'application') {
        path = name
      } else {
        path = `${parent}.${name}`;
      }

      slides.registerSlide(path, config);
      dsl.__proto__.route.apply(this, arguments);
    }

    return dsl;
  }
});

Router.map(function() {
  this.slide('slide-1', { style: 'green' }, function() {
    this.slide('sub-1', { style: 'blue' }, function() {
      this.slide('sub-11', { style: 'yellow' });
    });
    this.slide('sub-2', { style: 'red' });
  });
  this.slide('slide-2', { style: 'purple' });
});

export default Router;

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
    console.log('slides', slides);

    dsl.__proto__.slide = function() {
      // console.log('slide', arguments, this.parent); //TODO: GJ: setup slide map here

      let name = arguments[0];
      let parent = this.parent;
      let path;

      if (parent === 'application') {
        path = name
      } else {
        path = `${parent}.${name}`;
      }

      console.log(path);
      slides.registerSlide(path);
      dsl.__proto__.route.apply(this, arguments);
    }

    return dsl;
  }
});

Router.map(function() {
  this.slide('slide-1', { title: 'Slide 1' }, function() {
    this.slide('sub-1', { title: 'Subslide 1' }, function() {
      this.slide('sub-11', { title: 'Subslide 11' });
    });
    this.slide('sub-2', { title: 'Subslide 2' });
  });
  this.slide('slide-2', { title: 'Slide 2' });
});

export default Router;

import Service, { inject as service } from '@ember/service';

export default Service.extend({
  router: service(),

  currentSlideRouteName: Em.computed('slideRouteNames.[]', 'router.currentRouteName', function() {
    let slideRouteNames = this.get('slideRouteNames');
    let currentRouteName = this.get('router.currentRouteName');
    currentRouteName = currentRouteName.replace(/\.index$/, '');

    if (slideRouteNames.includes(currentRouteName)) {
      return currentRouteName;
    } else {
      return undefined;
    }
  }),

  currentSlideIndex: Em.computed('slideRouteNames.[]', 'currentSlideRouteName', function() {
    let currentSlideRouteName = this.get('currentSlideRouteName');
    return this.get('slideRouteNames').indexOf(currentSlideRouteName);
  }),

  previousSlideIndex: Em.computed('currentSlideIndex', function() {
    let currentSlideIndex = this.get('currentSlideIndex');

    if (currentSlideIndex > 0) {
      return currentSlideIndex - 1;
    } else {
      return 0;
    }
  }),

  previousSlideRouteName: Em.computed('previousSlideIndex', 'slideRouteNames.[]', function() {
    let slideRouteNames = this.get('slideRouteNames');
    let previousSlideIndex = this.get('previousSlideIndex');
    return slideRouteNames[previousSlideIndex];
  }),

  nextSlideIndex: Em.computed('slideCount', 'currentSlideIndex', function() {
    let slideCount = this.get('slideCount');
    let currentSlideIndex = this.get('currentSlideIndex');

    if (currentSlideIndex < slideCount - 1) {
      return currentSlideIndex + 1;
    } else {
      return currentSlideIndex;
    }
  }),

  nextSlideRouteName: Em.computed('nextSlideIndex', 'slideRouteNames.[]', function() {
    let slideRouteNames = this.get('slideRouteNames');
    let nextSlideIndex = this.get('nextSlideIndex');
    return slideRouteNames[nextSlideIndex];
  }),

  slideCount: Em.computed.alias('slideRouteNames.length'),

  init() {
    this._super(...arguments);
    this.set('slideRouteNames', []);
  },

  registerSlide(path) {
    this.get('slideRouteNames').push(path);
  },

  actions: {
    previous() {
      let previousSlideRouteName = this.get('previousSlideRouteName');
      this.get('router').transitionTo(previousSlideRouteName);
    },
    next() {
      let nextSlideRouteName = this.get('nextSlideRouteName');
      this.get('router').transitionTo(nextSlideRouteName);
    }
  }
});
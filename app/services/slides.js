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

  currentSlide: Em.computed('slideRoutes.[]', 'currentSlideIndex', function() {
    let slideRoutes = this.get('slideRoutes');
    let currentSlideIndex = this.get('currentSlideIndex');

    return slideRoutes[currentSlideIndex];
  }),

  currentSlideIndex: Em.computed('slideRouteNames.[]', 'currentSlideRouteName', function() {
    let currentSlideRouteName = this.get('currentSlideRouteName');
    return this.get('slideRouteNames').indexOf(currentSlideRouteName);
  }),

  currentSlideNumber: Em.computed('currentSlideIndex', function() {
    return this.get('currentSlideIndex') + 1;
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

  hasPreviousSlide: Em.computed('currentSlideIndex', function() {
    let currentSlideIndex = this.get('currentSlideIndex');

    return currentSlideIndex > 0;
  }),

  hasNextSlide: Em.computed('currentSlideIndex', 'slideCount', function() {
    let currentSlideIndex = this.get('currentSlideIndex');
    let slideCount = this.get('slideCount');

    return currentSlideIndex < slideCount - 1;
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

  slideCount: Em.computed.readOnly('slideRouteNames.length'),

  init() {
    this._super(...arguments);
    this.set('slideRoutes', []);
    this.set('slideRouteNames', []);
  },

  registerSlide(path, config = {}) {
    this.get('slideRoutes').push({ path, config });
    this.get('slideRouteNames').push(path); //TODO: CP from slideRoutes
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

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | slide-1/sub-2', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:slide-1/sub-2');
    assert.ok(route);
  });
});

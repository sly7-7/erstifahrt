import EmberObject from '@ember/object';
import NotableMixin from 'erstifahrt/mixins/notable';
import { module, test } from 'qunit';

module('Unit | Mixin | notable', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let NotableObject = EmberObject.extend(NotableMixin);
    let subject = NotableObject.create();
    assert.ok(subject);
  });
});

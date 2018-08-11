import { module, test } from 'qunit';
import { visit, currentURL, click, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | anmeldungen', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /anmeldungen', async function(assert) {
    await visit('/');

    const links = findAll('.nav-link');

    await click(links[0]);

    assert.equal(currentURL(), '/anmeldungen');
  });
});

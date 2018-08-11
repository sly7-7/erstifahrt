import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | main-nav', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{main-nav}}`);

    const topLinks = findAll('.navbar .nav-link');
    const printListsLinks = findAll('.navbar .dropdown-item')

    assert.equal(topLinks.length, 3);
    assert.equal(topLinks[0].textContent.trim(), 'Anmeldungen');
    assert.equal(topLinks[1].textContent.trim(), 'Aktuelle Fahrt');
    assert.equal(topLinks[2].textContent.trim(), 'Teilnehmerlisten');

    assert.equal(printListsLinks.length, 2);
    assert.equal(printListsLinks[0].textContent.trim(), 'Für den AStA');
    assert.equal(printListsLinks[1].textContent.trim(), 'Für das Haus');
  });
});

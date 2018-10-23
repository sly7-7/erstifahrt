import { module, test } from 'qunit';
import { click, fillIn, findAll, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | anmelden', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async () => {
    server.create('trip');
  });

  test('visiting /', async function(assert) {
    await visit('/');
    await fillIn('input[placeholder="Vorname"]', 'Max');
    await fillIn('input[placeholder="Nachname"]', 'Mustereinhorn');
    await fillIn('input[placeholder="Uni-Mail"]', 'max.mustereinhorn');

    await click('input[placeholder="Geburtsdatum"]')
    await fillIn('.input-datepicker .with-invisible-select:last-of-type select', 1970)
    await click('button[data-date$="15"]');

    const selects = findAll('.ember-power-select-trigger');

    await click(selects[0]);
    await click('.ember-power-select-option:first-of-type');

    await click(selects[1]);
    await click('.ember-power-select-option:first-of-type');

    await fillIn('textarea', 'Wasserallergie');

    await click('button[type="submit"]');

    const student = server.db.students[server.db.students.length - 1];

    assert.equal(student.first_name, 'Max');
    assert.equal(student.last_name, 'Mustereinhorn');
    assert.equal(student.email, 'max.mustereinhorn'); // adding @hhu.de is not done by the mock api
    assert.equal(student.comment, 'Wasserallergie');
  });
});

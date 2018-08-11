import Model from 'ember-data/model';
import attr from 'ember-data/attr';

import { computed } from '@ember/object';

export default Model.extend({
  firstName: attr(),
  lastName: attr(),
  dateOfBirth: attr('date'),
  subject: attr(),
  comment: attr(),
  hasPayed: attr('boolean'),
  councillor: attr(),
  registrationDate: attr('date'),
  registrationNumber: attr('number'),

  fullName: computed('firstName', 'lastName',  function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  })
});

import Model from 'ember-data/model';
import { attr, belongsTo } from '@ember-decorators/data';
import { computed } from '@ember-decorators/object';

import Validations from './validations';

export default class Student extends Model.extend(Validations) {
  @attr('number') age;

  @attr comment;

  @attr councillor;

  @attr email

  @attr firstName;

  @attr lastName;

  @attr nutrition;

  @attr subject;

  @attr('boolean') hasPayed;

  @attr('boolean') isActive;

  @attr('boolean') isBooked;

  @attr('boolean') isCanceled;

  @attr('boolean') isOnWaitingList;

  @attr('date', { isDate: true }) dateOfBirth;

  @attr('date') registrationDate;

  @attr('number') numberOnWaitingList;

  @attr('string') registrationSheetURL;

  @belongsTo trip;

  @computed('firstName', 'lastName')
  get fullName() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }

  set fullName(value) {
    if (typeof value !== 'string') {
      throw new TypeError('Invalid Name');
    }

    const name = value.split(/\s+/);
    const lastName = name.splice(-1).join('');
    const firstName = name.join(' ');

    this.setProperties({ firstName, lastName });
  }

  async book() {
    this.set('isBooked', true);
    return await this.save()
  }

  async unbook() {
    this.set('isBooked', false);
    return await this.save()
  }
}

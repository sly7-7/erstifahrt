import Model from 'ember-data/model';
import { attr } from '@ember-decorators/data';
import { computed } from '@ember-decorators/object';

export default class Student extends Model {
  @attr comment;

  @attr councillor;

  @attr firstName;

  @attr lastName;

  @attr subject;

  @attr('boolean') hasPayed;

  @attr('boolean') isBooked;

  @attr('date') dateOfBirth;

  @attr('date') registrationDate;

  @attr('number') registrationNumber;

  @computed('firstName', 'lastName')
  get fullName() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
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

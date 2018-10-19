import Model from 'ember-data/model';
import { attr, hasMany } from '@ember-decorators/data';
import { computed } from '@ember-decorators/object';
import { equal, filterBy } from '@ember-decorators/object/computed';

export default class TripModel extends Model {
  @attr title;

  @attr('number') fee;

  @attr('date') departure;

  @attr('number') maxStudents;

  @filterBy('students', 'isBooked', true) bookedStudents;

  @filterBy('students', 'isOnWaitingList', true) waitingListStudents;

  @computed('maxStudents', 'bookedStudents.length')
  get placesLeft() {
    return Math.max(0, this.maxStudents - this.bookedStudents.length);
  }

  @equal('placesLeft', 0) noPlacesLeft;

  @equal('placesLeft', 1) onePlaceLeft;

  @hasMany students;
}

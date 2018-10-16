import Model from 'ember-data/model';
import { attr, hasMany } from '@ember-decorators/data';
import { computed } from '@ember-decorators/object';
import { equal } from '@ember-decorators/object/computed';

export default class TripModel extends Model {
  @attr title;

  @attr('number') fee;

  @attr('date') departure;

  @attr('number') maxStudents;

  @computed('maxStudents', 'students.@each.isBooked')
  get placesLeft() {
    return Math.max(0, this.maxStudents - this.students.filterBy('isBooked').length);
  }

  @equal('placesLeft', 1) onePlaceLeft;

  @equal('placesLeft', 0) noPlacesLeft;

  @hasMany students;
}

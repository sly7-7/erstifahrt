import Controller from '@ember/controller';
import { set, computed as emberComputed } from '@ember/object';
import { action,computed } from '@ember-decorators/object';
import { filterBy, macro } from '@ember-decorators/object/computed';

import Notable from 'erstifahrt/mixins/notable';

export const SUBJECTS = [
  'Informatik',
  'Mathematik',
  'Med. Physik',
  'Physik',
  'Finanz- und Versicherungsmathematik',
  'Naturwissenschaften'
];

export const NUTRITIONS = [
    'Omnivor (alles)',
    'Vegetarisch',
    'Vegan'
];

const includesMacro = (collection, key) => emberComputed(`${collection}.[]`, key, function() {
  return this[collection].includes(key);
});

const filters = macro(includesMacro, 'filters');

@Notable
export default class StudentsController extends Controller {
  @filterBy('model.students', 'isActive') activeStudents;

  filters = ['isActive'];

  @action
  addToFilter(property) {
    this.filters.addObject(property);
  }

  @action
  removeFromFilter(property) {
    this.filters.removeObject(property);
  }

  @action
  resetFilter() {
    this.set('filters', []);
  }

  @computed(
    'filters.[]',
    'query',
    'model.students.@each.{hasPayed,isActive,isOnWaitingList,isBooked}'
  )
  get filteredStudents() {
    return this.model.students.filter(student => {
      const re = new RegExp(`.*${this.query.split('').join('.*')}.*`, 'i');
      return (
        !this.query
          || re.test(student.fullName)
          || re.test(student.nutrition)
          || re.test(student.subject)
          || re.test(student.councillor)
          || re.test(student.age)
          || re.test(student.comment)
      ) && this.filters.every(key => student[key]);
    });
  }

  nutritions = NUTRITIONS;

  subjects = SUBJECTS;

  query = '';

  @filters('isActive') filterActive;

  @filters('isBooked') filterBooked;

  @filters('hasPayed') filterPayed;

  @filters('isOnWaitingList') filterWaiting;

  @action
  async book(student) {
    this.resetMessage();

    try {
      await student.book();
    } catch(e) {
      this.error(
        `${student.fullName} konnte wegen eines Fehlers im Backend nicht angemeldet werden.`,
        e.message
      );
      return false;
    }

    this.success(`${student.fullName} wurde erfolgreich angemeldet.`);
  }

  @action
  async delete(student) {
    return student.destroyRecord();
  }

  @action
  async unbook(student) {
    this.resetMessage();

    try {
      await student.unbook();
    } catch(e) {
      this.error(
        `${student.fullName} konnte wegen eines Fehlers im Backend nicht abgemeldet werden.`,
        e.message
      );

      student.rollbackAttributes();
      return false;
    }

    this.success(`${student.fullName} wurde erfolgreich abgemeldet.`);
  }

  @action
  async update(student, key, value) {
    this.resetMessage();

    set(student, key, value);

    try {
      await student.save();
    } catch(e) {
      this.error(
        `${student.fullName} konnte wegen eines Fehlers im Backend nicht bearbeitet werden.`,
        e.message
      );

      student.rollbackAttributes();
      return false;
    }

    this.success(`${student.fullName} wurde erfolgreich bearbeitet.`);
  }
}

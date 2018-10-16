import Controller from '@ember/controller';
import { set } from '@ember/object';
import { action } from '@ember-decorators/object';
import { filterBy } from '@ember-decorators/object/computed';

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

@Notable
export default class StudentsController extends Controller {
  @filterBy('model.students', 'isActive') activeStudents;

  subjects = SUBJECTS;

  showInactive = false;

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

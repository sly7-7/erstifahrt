import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';

import Notable from 'erstifahrt/mixins/notable';

@Notable
export default class StudentsController extends Controller {
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
  edit() {
    // TODO
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
}

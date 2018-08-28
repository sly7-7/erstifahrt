import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';

export default class StudentsController extends Controller {
  @action
  async book(student) {
    this.resetMessage();

    try {
      await student.book();
    } catch(e) {
      this.setProperties({
        message:
          `${student.fullName} konnte wegen eines Fehlers im Backend nicht angemeldet werden.`,
        messageDetail: e.message,
        messageType: 'danger'
      });
      student.rollbackAttributes();
      return false;
    }

    this.setProperties({
      message: `${student.fullName} wurde erfolgreich angemeldet.`,
      messageType: 'success'
    });
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
      this.setProperties({
        message:
          `${student.fullName} konnte wegen eines Fehlers im Backend nicht abgemeldet werden.`,
        messageDetail: e.message,
        messageType: 'danger'
      });
      student.rollbackAttributes();
      return false;
    }

    this.setProperties({
      message: `${student.fullName} wurde erfolgreich abgemeldet.`,
      messageType: 'success'
    });
  }

  resetMessage() {
    this.setProperties({ message: null, messageDetail: null, messageType: null });
  }
}

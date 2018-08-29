import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';

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

  success(message, messageDetail) {
    this.showMessage('success', message, messageDetail);
  }

  error(message, messageDetail) {
    this.showMessage('danger', message, messageDetail);
  }

  showMessage(messageType, message, messageDetail) {
    this.setProperties({ messageType, message, messageDetail });
    setTimeout(() => this.resetMessage(), 5000);
  }

  resetMessage() {
    this.setProperties({ message: null, messageDetail: null, messageType: null });
  }
}

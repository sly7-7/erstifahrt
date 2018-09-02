import Service from '@ember/service';

export default class NotifyService extends Service {
  showMessage(messageType, message, messageDetail) {
    this.setProperties({ messageType, message, messageDetail });
  }

  resetMessage() {
    this.setProperties({ message: null, messageDetail: null, messageType: null });
  }
}

import { defineProperty } from '@ember/object';
import { cancel, later } from '@ember/runloop';
import { inject as service } from '@ember/service';

function makeNotifyFunction(type) {
  return function notify(message, messageDetail) {
    this.showMessage(type, message, messageDetail);
  }
}

export default function notable(target) {
  let timeout = null;

  function showMessage(messageType, message, messageDetail) {
    cancel(timeout);
    this.notify.showMessage(messageType, message, messageDetail);
    timeout = later(this, 'resetMessage', this.messageTimeout);
  }

  function resetMessage() {
    this.notify.resetMessage();
  }

  defineProperty(target.prototype, 'notify', service('notify'));

  target.prototype.messageTimeout = 5000;
  target.prototype.showMessage = showMessage;
  target.prototype.resetMessage = resetMessage;
  target.prototype.success = makeNotifyFunction('success');
  target.prototype.info = makeNotifyFunction('info');
  target.prototype.warn = makeNotifyFunction('warn');
  target.prototype.error = makeNotifyFunction('danger');
}

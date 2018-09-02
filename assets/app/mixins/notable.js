import { cancel, later } from '@ember/runloop';

function makeNotifyFunction(type) {
  return function notify(message, messageDetail) {
    this.showMessage(type, message, messageDetail);
  }
}

export default function notable(target) {
  let timeout = null;

  function showMessage(messageType, message, messageDetail) {
    cancel(timeout);
    this.setProperties({ messageType, message, messageDetail });
    timeout = later(this, 'resetMessage', 5000);
  }

  function resetMessage() {
    if (!this.isDestroyed) {
      this.setProperties({ message: null, messageDetail: null, messageType: null });
    }
  }

  target.prototype.showMessage = showMessage;
  target.prototype.resetMessage = resetMessage;
  target.prototype.success = makeNotifyFunction('success');
  target.prototype.info = makeNotifyFunction('info');
  target.prototype.warn = makeNotifyFunction('warn');
  target.prototype.error = makeNotifyFunction('danger');
}

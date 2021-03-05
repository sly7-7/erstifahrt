import Component from '@ember/component';

import { readOnly } from '@ember-decorators/object/computed';
import { inject as service } from '@ember/service';

export default class GlobalMessageComponent extends Component {
  @service
  notify;

  @readOnly('notify.message')
  message;

  @readOnly('notify.messageDetail')
  messageDetail;

  @readOnly('notify.messageType')
  messageType;
}

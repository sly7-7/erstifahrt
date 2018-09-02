import Component from '@ember/component';

import { readOnly } from '@ember-decorators/object/computed';
import { service } from '@ember-decorators/service';

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

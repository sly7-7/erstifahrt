import Component from '@ember/component';
import { tagName } from '@ember-decorators/component';

@tagName('')
export default class EditableValueDatepickerComponent extends Component {
  format = 'L'

  onChange() {}

  async onEscape() {}

  async onReturn() {}
}

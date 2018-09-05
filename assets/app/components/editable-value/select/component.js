import Component from '@ember/component';
import { tagName } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';

@tagName('')
export default class EditableValueSelectComponent extends Component {
  @computed('value')
  get selectedValue() {
    return this.value;
  }

  set selectedValue(value) {
    this.onChange(value);
    return value
  }

  onChange() {}
}

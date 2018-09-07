import Component from '@ember/component';
import { tagName } from '@ember-decorators/component';
import { action, computed } from '@ember-decorators/object';

@tagName('')
export default class EditableValueDatepickerComponent extends Component {
  @action
  async save() {
    try {
      await this.onReturn(this.selected);
    } finally {
      this.close();
    }
  }

  @action
  async cancel() {
    try {
      await this.onEscape(this.selected);
    } finally {
      this.close();
    }
  }

  format = 'L'

  @computed('value')
  get currentDate() {
    return this.value;
  }

  set currentDate(value) {
    return value;
  }

  @computed('value')
  get selected() {
    return this.value;
  }

  set selected(value) {
    this.onChange(value);
    return value;
  }

  close() {
    this.set('visible', false);
  }

  async onEscape() {}

  async onReturn() {}
}

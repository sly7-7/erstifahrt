import Component from '@ember/component';
import { tagName } from '@ember-decorators/component';
import { action, on } from '@ember-decorators/object';

@tagName('')
export default class EditableValuComponent extends Component {
  isEditing = false

  @action
  cancel() {
    if (!this.isPending) {
      this.set('isEditing', false);
    }
  }

  @action
  edit() {
    if (!this.isPending) {
      this.set('isEditing', true);
    }
  }

  @action
  async onKeyup(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        this.edit();
    }
  }

  @action
  async onKeyupEdit(e) {
    switch (e.keyCode) {
      case 13:
        e.preventDefault();
        await this.save();
        break;
      case 17:
        e.preventDefault();
        this.cancel();
        break;
    }
  }

  @action
  async save() {
    this.set('isPending', true);

    try {
      await this.onSave(this.newValue);
    } finally {
      this.setProperties({ isEditing: false, isPending: false });
    }
  }

  @on('didReceiveAttrs')
  updateNewValue() {
    this.set('newValue', this.value);
  }

  async onSave() { }
}

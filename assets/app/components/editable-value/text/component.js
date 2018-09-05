import Component from '@ember/component';
import { attribute, classNames, tagName } from '@ember-decorators/component';
import { reads } from '@ember-decorators/object/computed';

@classNames('form-control', 'form-control-sm')
@tagName('input')
export default class EditableTextComponent extends Component {
  @attribute autofocus = true

  @attribute disabled = false

  @attribute('value')
  @reads('value')
  get _value() {
    return this.value;
  }

  async keyUp(e) {
    switch (e.keyCode) {
      case 13:
        e.preventDefault();
        return await this.onReturn();
      case 17:
        e.preventDefault();
        return this.onEscape();
      default:
        return this.onChange(e.target.value);
    }
  }

  onChange() {}

  onEscape() {}

  onReturn() {}
}

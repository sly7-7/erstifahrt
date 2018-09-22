import Component from '@ember/component';
import { tagName } from '@ember-decorators/component';

@tagName('form')
export default class RegisterFormComponent extends Component {
  submit(e) {
    e.preventDefault();

    alert('submit');
  }
}

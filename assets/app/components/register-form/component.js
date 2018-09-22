import Component from '@ember/component';
import { classNames, tagName } from '@ember-decorators/component';

import { SUBJECTS } from '../../students/controller';

@classNames('register-form')
@tagName('form')
export default class RegisterFormComponent extends Component {
  data = {};

  nutritions = [
    'Omnivor',
    'Vegetarisch',
    'Vegan'
  ];

  subjects = SUBJECTS;

  submit(e) {
    e.preventDefault();

    alert('submit');
  }
}

import Component from '@ember/component';
import { argument } from '@ember-decorators/argument';
import { type } from '@ember-decorators/argument/type';
import { classNames } from '@ember-decorators/component';
import { action } from '@ember-decorators/object';

import Student from '../../student/model';
import { NUTRITIONS, SUBJECTS } from '../../students/controller';

@classNames('register-form')
export default class RegisterFormComponent extends Component {
  errorMessages = [];

  hasError = false;

  @action
  invalid() {
    this.setError(this.student.validations.messages);
  }

  nutritions = NUTRITIONS;

  @argument @type(Function) onSubmit;

  @argument @type(Student) student;

  subjects = SUBJECTS;

  @action
  async register(data) {
    this.resetError();

    try {
      await this.onSubmit(data);
    } catch(e) {
      this.setError(this.student.validations.messages);
    }
  }

  setError(errorMessages) {
    this.setProperties({ hasError: true, errorMessages });
  }

  resetError() {
    this.setProperties({ hasError: false, errorMessages: [] });
  }
}

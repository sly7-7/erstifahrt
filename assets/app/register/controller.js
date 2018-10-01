import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';

export default class RegisterController extends Controller {
  @action
  async register(student) {
    await student.save();
    this.transitionToRoute('registration', student);
  }
}

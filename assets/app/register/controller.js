import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';

export default class RegisterController extends Controller {
  @action
  async register(data) {
    this.model.student.setProperties(data);
    await this.model.student.save();
  }
}

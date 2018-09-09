import Component from '@ember/component';
import { tagName } from '@ember-decorators/component';
import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

@tagName('')
export default class LoginFormComponent extends Component {
  @service session

  @action
  async authenticate() {
    try {
      await this.session.authenticate('authenticator:oauth2', this.identification, this.password);
    } catch(reason) {
      this.set('errorMessage', reason.error || reason);
    }
  }
}

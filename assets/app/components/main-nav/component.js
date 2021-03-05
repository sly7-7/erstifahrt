import Component from '@ember/component';
import { tagName } from '@ember-decorators/component';
import { action } from '@ember-decorators/object';
import { inject as service } from '@ember/service';

@tagName('')
export default class MainNavComponent extends Component {
  @service session;

  @action
  invalidateSession() {
    this.session.invalidate();
  }
}

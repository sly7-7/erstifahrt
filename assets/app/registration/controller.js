import Controller from '@ember/controller';

export default class RegistrationController extends Controller {
  queryParams = ['activated']

  activated = false
}

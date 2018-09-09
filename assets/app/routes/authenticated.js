import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

class AuthenticatedRoute extends Route {
}

AuthenticatedRoute.reopen(AuthenticatedRouteMixin);

export default AuthenticatedRoute;

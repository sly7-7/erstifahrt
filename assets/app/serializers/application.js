import JSONAPISerializer from 'ember-data/serializers/json-api';
import { underscore } from '@ember/string';

export default class ApplicationSerializer extends JSONAPISerializer {
  keyForAttribute(key) {
    return underscore(key);
  }
}

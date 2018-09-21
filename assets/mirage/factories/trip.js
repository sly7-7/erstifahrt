import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  title(i) {
    return `Erstifahrt ${2018 - i}`;
  }
});

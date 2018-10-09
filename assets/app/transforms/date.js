import EmberDateTransform from 'ember-data/transforms/date';
import moment from 'moment';

export default class DateTransform extends EmberDateTransform {
  serialize(date, options = {}) {
    if (!options.isDate) {
      return super.serialize(date);
    }

    if (date instanceof Date && !isNaN(date)) {
      return moment(date).format('YYYY-MM-DD');
    }

    return null;
  }
}

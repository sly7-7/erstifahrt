import EmberDateTransform from '@ember-data/serializer/transform';
import moment from 'moment';

export default class MyDateTransform extends EmberDateTransform {
  serialize(date, options = {}) {
    if (!options.isDate) {
      return super.serialize(date);
    }

    if (date instanceof Date && !isNaN(date)) {
      return moment(date).format('YYYY-MM-DD');
    }

    return null;
  }

  deserialize(serialized) {
    let type = typeof serialized;

    if (type === 'string') {
      let offset = serialized.indexOf('+');

      if (offset !== -1 && serialized.length - 5 === offset) {
        offset += 3;
        return new Date(
          serialized.slice(0, offset) + ':' + serialized.slice(offset)
        );
      }
      return new Date(serialized);
    } else if (type === 'number') {
      return new Date(serialized);
    } else if (serialized === null || serialized === undefined) {
      // if the value is null return null
      // if the value is not present in the data return undefined
      return serialized;
    } else {
      return null;
    }
  }
}

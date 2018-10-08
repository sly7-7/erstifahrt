import Model from 'ember-data/model';
import { attr } from '@ember-decorators/data';

export default class TripModel extends Model {
  @attr title;

  @attr('number') fee;

  @attr('date') departure;
}

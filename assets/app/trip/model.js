import Model from 'ember-data/model';
import { attr } from '@ember-decorators/data';

export default class TripModel extends Model {
  @attr title;
}

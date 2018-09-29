import Component from '@ember/component';
import { isEmpty } from '@ember/utils';
import { argument } from '@ember-decorators/argument';
import { optional, type } from '@ember-decorators/argument/type';
import { classNames } from '@ember-decorators/component';
import { action, computed } from '@ember-decorators/object';
import moment from 'moment';

@classNames('input-datepicker')
export default class InputDateComponent extends Component {
  @type(optional('boolean')) @argument closeOnChange = false;

  @type(optional('string')) @argument format = 'LL';

  @type(optional('string')) @argument inputClassNames = "form-control";

  @type(optional('boolean')) @argument opened = false;

  @type(optional('string')) @argument placeholder = "Datum";

  @type(optional('boolean')) @argument required = false;

  @type(optional(Function)) @argument async onChange() {}

  @type(optional(Date)) @argument value;

  months = [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ];

  years = Array(...Array(80)).map((_, i) => `${i + 1940}`);

  @action
  changeCenter(unit, calendar, e) {
    let newCenter = moment(calendar.center).clone()[unit](e.target.value);
    calendar.actions.changeCenter(newCenter);
  }

  @action
  close() {
    if (!this.isDestroyed) {
      this.set('opened', false);
    }
  }

  @action
  keypress(e) {
    if (e.keyCode !== 13) { // allow enter
      e.preventDefault();
    }
  }

  @action
  async open() {
    this.set('opened', true);
  }

  @computed('value')
  get currentDate() {
    return this.value;
  }

  set currentDate(value) {
    return value;
  }

  @computed('selected')
  get formattedDate() {
    if (isEmpty(this.selected)) {
      return "";
    }

    return moment(this.selected).format(this.format);
  }

  @computed('value')
  get selected() {
    return this.value;
  }

  set selected(value) {
    this.onChange(value);

    if (this.closeOnChange) {
      this.close();
    }

    return value;
  }
}

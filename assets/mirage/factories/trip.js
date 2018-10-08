import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  title(i) {
    return `Erstifahrt ${2018 - i}`;
  },

  fee() {
    return faker.random.number({ min: 10, max: 50 });
  },

  departure() {
    const date = faker.date.between(
      new Date(`${new Date().getFullYear()}-11-01`),
      new Date(`${new Date().getFullYear()}-11-30`)
    );

    date.setHours(16);

    return date;
  }
});

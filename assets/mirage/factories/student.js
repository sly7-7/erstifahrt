import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  firstName: faker.name.firstName,
  lastName: faker.name.lastName,
  dateOfBirth() {
    return faker.date.between(
      new Date(`${new Date().getFullYear() - 25}-01-01`),
      new Date(`${new Date().getFullYear() - 16}-01-01`)
    );
  },
  subject() {
    return faker.random.arrayElement([
      'Informatik',
      'Physik',
      'Med. Physik',
      'Mathematik'
    ]);
  },
  comment: faker.company.catchPhrase,
  hasPayed: faker.random.boolean,
  isBooked: faker.random.boolean,
  councillor: () => faker.name.findName(),
  registrationDate() {
    return faker.date.recent(40);
  },
  registrationNumber(i) {
    return i;
  },
});

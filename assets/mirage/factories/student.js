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
      'Medizinische Physik',
      'Mathematik'
    ]);
  },
  comment: faker.company.catchPhrase,
  hasPayed: faker.random.boolean,
  councillor: faker.random.name,
  registrationDate() {
    return faker.date.recent(40);
  },
  registrationNumber(i) {
    return i + 1;
  },
});

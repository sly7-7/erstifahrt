import { Factory, association } from 'ember-cli-mirage';
import faker from 'faker';

import { NUTRITIONS } from 'erstifahrt/students/controller';

export default Factory.extend({
  comment: faker.company.catchPhrase,

  councillor: () => faker.name.findName(),

  dateOfBirth() {
    return faker.date.between(
      new Date(`${new Date().getFullYear() - 25}-01-01`),
      new Date(`${new Date().getFullYear() - 16}-01-01`)
    );
  },

  age() {
    return faker.random.number({ min: 18, max: 40 });
  },

  email() {
    return faker.internet.email();
  },

  firstName: faker.name.firstName,

  hasPayed: faker.random.boolean,

  isBooked: faker.random.boolean,

  isActive: faker.random.boolean,

  isOnWaitingList: faker.random.boolean,

  lastName: faker.name.lastName,

  nutrition() {
    return faker.random.arrayElement(NUTRITIONS);
  },

  registrationDate() {
    return faker.date.recent(40);
  },

  registrationNumber(i) {
    return i;
  },

  registrationSheetURL: faker.internet.url,

  subject() {
    return faker.random.arrayElement([
      'Informatik',
      'Physik',
      'Med. Physik',
      'Mathematik',
    ]);
  },

  trip: association(),
});

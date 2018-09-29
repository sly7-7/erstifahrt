import { validator, buildValidations } from 'ember-cp-validations';

function presence(description) {
  const message = '{description} muss ausgefüllt werden';
  return validator('presence', { description, message, presence: true })
}

const common = [ validator('ds-error') ];

export default buildValidations({
  firstName: [ ...common, presence('Vorname') ],
  lastName: [ ...common, presence('Nachname') ],
  email: [ ...common, presence('E-Mail-Adresse') ],
  dateOfBirth: [ ...common, presence('Geburtsdatum') ],
  subject: [ ...common, presence('Studiengang') ],
  nutrition: [ ...common, presence('Ernährungsform') ],
});

export default function() {

  this.get('/students', (schema/*, request*/) => {
    return schema.students.all();
  });
}

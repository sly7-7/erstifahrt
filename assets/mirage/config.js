export default function() {

  this.get('/students', (schema/*, request*/) => {
    return schema.students.all();
  });

  this.patch('/students/2', { message: 'Student id 2 geht nich!!!' }, 500);
  this.patch('/students/:id');
}

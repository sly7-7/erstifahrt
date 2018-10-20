export default function(server) {
  const trip = server.create('trip');

  trip.students.models[0].update({
    is_booked: false,
    is_on_waiting_list: true,
    number_on_waiting_list: 1
  });
}

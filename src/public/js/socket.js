const socket = io();

socket.on('connect', () => {
  console.log('Socket conectado');
});

socket.on('service:created', (service) => {
  console.log('service:created', service);
  const ul = document.getElementById('services-list');
  if (!ul) return;
  const li = document.createElement('li');
  li.setAttribute('data-id', service.id || service._id);
  li.innerHTML = `<strong>${service.name}</strong> - ${service.description}<br>Duración: ${service.duration} min · Precio: $${service.price} · Categoría: ${service.category} · Disponible: ${service.available}`;
  ul.prepend(li);
});

socket.on('service:updated', (service) => {
  console.log('service:updated', service);
  const el = document.querySelector(`#services-list li[data-id='${service.id || service._id}']`);
  if (!el) return;
  el.innerHTML = `<strong>${service.name}</strong> - ${service.description}<br>Duración: ${service.duration} min · Precio: $${service.price} · Categoría: ${service.category} · Disponible: ${service.available}`;
});

socket.on('service:deleted', (service) => {
  console.log('service:deleted', service);
  const el = document.querySelector(`#services-list li[data-id='${service.id || service._id}']`);
  if (el) el.remove();
});

socket.on('booking:created', (booking) => {
  console.log('booking:created', booking);
  // simple notification
  alert(`Nueva reserva de ${booking.clientName} en ${booking.date} ${booking.time}`);
});

socket.on('booking:serviceAdded', (booking) => {
  console.log('booking:serviceAdded', booking);
  // could update bookings view; for now console log
});

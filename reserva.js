// reserva.js

document.addEventListener('DOMContentLoaded', () => {
  const reservationForm = document.getElementById('reservationForm');
  reservationForm.addEventListener('submit', submitReservation);
});

async function submitReservation(event) {
  event.preventDefault(); // evitar recarga

  const msgSuccess = document.getElementById('msgSuccess');
  const msgError = document.getElementById('msgError');
  msgSuccess.classList.add('hidden');
  msgError.classList.add('hidden');

  const customerName = document.getElementById('customerName').value.trim();
  const customerEmail = document.getElementById('customerEmail').value.trim();
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const peopleCount = parseInt(document.getElementById('peopleCount').value, 10);
  const notes = document.getElementById('notes').value.trim();

  if (!customerName || !customerEmail || !date || !time || !peopleCount) {
    msgError.textContent = 'Todos los campos obligatorios deben llenarse.';
    msgError.classList.remove('hidden');
    return;
  }

  const reservationData = { customerName, customerEmail, date, time, peopleCount, notes };

  try {
    const response = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservationData),
    });

    if (response.ok) {
      document.getElementById('reservationForm').reset();
      msgSuccess.classList.remove('hidden');
    } else {
      const errorData = await response.json();
      console.error('Error respuesta:', errorData);
      msgError.textContent = 'Error al enviar la reserva. Intenta de nuevo.';
      msgError.classList.remove('hidden');
    }
  } catch (error) {
    console.error(error);
    msgError.textContent = 'Error de conexión. Intenta nuevamente más tarde.';
    msgError.classList.remove('hidden');
  }
}
// --- Tareas ---
const tareaForm = document.getElementById('tareaForm');
const tareaInput = document.getElementById('tareaInput');
const listaTareas = document.getElementById('listaTareas');
let tareas = [];

tareaForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (tareaInput.value.trim() !== '') {
    tareas.push(tareaInput.value.trim());
    tareaInput.value = '';
    mostrarTareas();
  }
});

const mostrarTareas = () => {
  listaTareas.innerHTML = '';
  tareas.map((tarea, idx) => {
    const li = document.createElement('li');
    li.textContent = tarea;
    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.className = 'eliminar-btn';
    btn.onclick = () => eliminarTarea(idx);
    li.appendChild(btn);
    listaTareas.appendChild(li);
  });
};

const eliminarTarea = (idx) => {
  tareas.splice(idx, 1);
  mostrarTareas();
};

// --- Pomodoro Timer ---
let minutos = 25;
let segundos = 0;
let timerInterval = null;

const minutosBox = document.getElementById('minutos');
const segundosBox = document.getElementById('segundos');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

const actualizarTimer = () => {
  minutosBox.textContent = minutos.toString().padStart(2, '0');
  segundosBox.textContent = segundos.toString().padStart(2, '0');
};

const iniciarTimer = () => {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    if (segundos === 0) {
      if (minutos === 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        return;
      }
      minutos--;
      segundos = 59;
    } else {
      segundos--;
    }
    actualizarTimer();
  }, 1000);
};

const pausarTimer = () => {
  clearInterval(timerInterval);
  timerInterval = null;
};

const resetearTimer = () => {
  clearInterval(timerInterval);
  timerInterval = null;
  minutos = 25;
  segundos = 0;
  actualizarTimer();
};

startBtn.onclick = iniciarTimer;
pauseBtn.onclick = pausarTimer;
resetBtn.onclick = resetearTimer;

// --- Info Btn ---
document.getElementById('infoBtn').onclick = () => {
  alert('La técnica Pomodoro consiste en trabajar durante 25 minutos y luego tomar un breve descanso. ¡Organiza tus tareas y mejora tu productividad!');
};

// Inicializar
actualizarTimer();
mostrarTareas();
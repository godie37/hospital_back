import { validacionBlur } from "../validaciones.js";
import { recuperarUser } from '../validador_session.js'

let selectListaMedicos = document.getElementById("listaMedico");
let inputMes = document.getElementById("mes");
let bloque_fecha = document.getElementById("bloque_fecha");
let dias = document.getElementById("dias_semana");
let fechas = document.getElementById("fechas");
let calendario = document.getElementById("calendario");
let listaMedicos = [];
let medicoSeleccionado = null;
let fechaSeleccionada = null;
const SEMANA = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
let turno = [];

let bloque_turnero = document.getElementById('bloque_turnero')
let form = document.getElementById('campos_form')
let btn_enviar = document.getElementById("btn_enviar");
let btn_volver = document.getElementById("btn_volver");
let tit_calendario = document.querySelector('.tit_calendario')

let fechaCompleta = ''

window.addEventListener("load", () => {
	OBTENER_MEDICOS();
	inputMes.min = new Date().toJSON().slice(0, 7);
});

// Recupero todos los médicos de la api
const OBTENER_MEDICOS = async () => {
	const RESP = await fetch("/api/medicos");
	const MEDICOS = await RESP.json();
	let especialidades = await OBTENER_ESPECIALIDADES()
	listarMedicos(MEDICOS, especialidades);
};

const OBTENER_ESPECIALIDADES = async () => {
	const RESP = await fetch("/api/especialidades");
	const ESPECIALIDADES = await RESP.json();
	return ESPECIALIDADES
};

// Armo el select con los médicos
function listarMedicos(medicos, especialidades) {
	listaMedicos = medicos;
	medicos.forEach((e) => {
		let especialidad_seleccionada;

		especialidades.find(especialidad => {
			if (especialidad.id == e.especialidad_id) {
				especialidad_seleccionada = especialidad.descripcion
			}
		})

		let option = document.createElement("option");
		option.value = e.id;
		option.text = e.nombre_completo + " || " + especialidad_seleccionada;
		selectListaMedicos.add(option);
	});
}

// Recupero el médico seleccionado
selectListaMedicos.addEventListener("change", (e) => {
	e.preventDefault();

	listaMedicos.forEach((medicos) => {
		if (medicos.id == e.target.value) {
			medicoSeleccionado = medicos;
		}
	});

	if (fechaSeleccionada != null) {
		mostrarCalendario();
		armarCalendario();
	}
});

// Recupero el mes y año seleccionado
inputMes.addEventListener("change", (e) => {
	e.preventDefault();

	fechaSeleccionada = e.target.value.split("-");

	if (medicoSeleccionado != null) {
		mostrarCalendario();
		armarCalendario();
	}
});

// Muestro el calendario si se seleccionó el médico y el mes, sino queda oculto
function mostrarCalendario() {
	calendario.style.display = "flex";
	calendario.style.flexDirection = "column";
	calendario.style.marginBottom = "10px";
}

// Lógica del calendario
function armarCalendario() {
	let anio = fechaSeleccionada[0];
	let mes = fechaSeleccionada[1];

	let totalDiasMes = new Date(anio, mes, 0).getDate();
	let primerDiaMes = new Date(anio, mes - 1, 1);
	let hoy_dia = new Date().getDate()
	let hoy_mes = (new Date().getMonth() + 1).toString().length == 1 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;

	// Lista index días en el que el médico trabaja
	let diasDisponible = [];
	let diasAtencion = JSON.parse(medicoSeleccionado.dias_atencion);
	let hora_egreso = JSON.parse(medicoSeleccionado.horario_atencion)[1]

	SEMANA.forEach((e) => {
		diasAtencion.find(dia => {
			let dias = dia == 'Miércoles' ? "Miercoles" : dia
			if (e == dias) {
				diasDisponible.push(SEMANA.indexOf(e));
			}
		})
	});

	let fechas = document.getElementById("fechas");
	fechas.innerHTML = "";

	for (let i = 1; i < totalDiasMes + 1; i++) {
		// Recupero el num del día de la semana para determinar si esta disponible
		let num_dia;

		if (i >= hoy_dia && hoy_mes == mes && Date.parse(new Date(anio + "-" + mes + "-" + i + " " + hora_egreso)) > Date.parse(new Date())) {
			num_dia = new Date(anio, mes - 1, i).getDay();
		} else if (hoy_mes != mes) {
			num_dia = new Date(anio, mes - 1, i).getDay();
		}

		// Indico los días disponibles para solicitar turnos
		let hayAtencion = diasDisponible.includes(num_dia);

		// Creo el calendario
		fechas.innerHTML = fechas.innerHTML + `
				<div class="${hayAtencion ? "fecha_calendario" : "sinAtencion"}" ${hayAtencion ? `data-dia=${i}` : ""} ${!hayAtencion ? "title='Sin atención'" : ""}>
					<span class="msj_turno">${hayAtencion ? "Solicitar turno" : ""}</span>
					<span class="dia_num"><span class="dia_nombre">${SEMANA[num_dia]}</span>
					<span>${i}</span>
				</div>
			`;
	}

	solicitarTurno();
	// Acomodo el primer día del mes en el lugar correcto del calendario
	let fecha_calendario = document.querySelectorAll("." + fechas.firstChild.nextSibling.getAttribute("class"));

	fecha_calendario[0].style.gridColumnStart = primerDiaMes.getDay() == 0 ? 7 : primerDiaMes.getDay();
}

function solicitarTurno() {
	let diasConAtencion = document.querySelectorAll(".fecha_calendario");

	// Identifico cada día con atención y le asigno el evento click
	for (let i = 0; i < diasConAtencion.length; i++) {
		diasConAtencion[i].addEventListener("click", async (e) => {
			e.preventDefault();

			let msj_fecha = ''

			generarFormularioTurnero()

			// Habilito campo file solo en el caso de ser requerido
			let con_derivacion = document.querySelector(".con_derivacion");
			let sin_derivacion = document.querySelector(".sin_derivacion");
			let img_derivacion = document.getElementById("adjunto_derivacion");
			let file_turno = document.querySelector(".file_turno");

			con_derivacion.addEventListener("click", () => {
				file_turno.style.display = "flex";
				file_turno.style.flexDirection = "column";
				img_derivacion.dataset.validacion = '["required"]';
			});
			sin_derivacion.addEventListener("click", () => {
				file_turno.style.display = "none";
				img_derivacion.dataset.validacion = "[]";
			});
			//

			// Obtengo los datos de atención y genero el rango horario en bloques de 30 min
			let dia = diasConAtencion[i].getAttribute("data-dia");
			let anio = fechaSeleccionada[0];
			let mes = fechaSeleccionada[1];
			let horarioAtencion = medicoSeleccionado.horario_atencion;
			let rangoHorario = listarHorarios(anio, mes, dia, JSON.parse(horarioAtencion));

			tit_calendario.innerHTML = 'Turno para el ' + SEMANA[new Date(anio, mes - 1, dia).getDay()] + ' ' + dia + ' '
			fechaCompleta = anio + '-' + mes + '-' + (dia.length == 1 ? '0' + dia : dia)

			// Creo el select e ingreso los valores
			let select_horario = document.getElementById("horario");
			rangoHorario.forEach((horario) => {
				let option = document.createElement("option");
				option.value = horario;
				option.text = horario;
				select_horario.add(option);
			});
		});
	}
}

btn_volver.addEventListener("click", (e) => {
	e.preventDefault();
	bloque_fecha.style.backgroundColor = "cornsilk";
	dias.removeAttribute("style");
	fechas.removeAttribute("style");
	selectListaMedicos.removeAttribute("disabled");
	inputMes.removeAttribute("disabled");
	tit_calendario.innerHTML = 'Seleccionar día'
	bloque_turnero.setAttribute('hidden', true)
	bloque_fecha.removeAttribute('hidden')
	form.reset()
});

// Genero el formulario para solicitar el turno
function generarFormularioTurnero() {
	dias.style.display = "none";
	fechas.style.display = "none";
	bloque_turnero.style.backgroundColor = "rgb(224, 219, 198)";
	selectListaMedicos.setAttribute("disabled", true);
	inputMes.setAttribute("disabled", true);
	bloque_turnero.removeAttribute('hidden')
	bloque_fecha.setAttribute('hidden', true)
}

// Armo el rango de horarios cada 30 minutos para la atención del médico
function listarHorarios(anio, mes, dia, horarioAtencion) {
	let rangoHorario = [];

	let hora_ingreso = new Date(anio + "-" + mes + "-" + dia + " " + horarioAtencion[0]);
	let hora_salida = new Date(anio + "-" + mes + "-" + dia + " " + horarioAtencion[1]);

	while (Date.parse(hora_ingreso) < Date.parse(hora_salida)) {
		let hora = hora_ingreso.getHours();
		let minutos = hora_ingreso.getMinutes();

		rangoHorario.push((hora.toString().length == 1 ? "0" + hora : hora) + ":" + (minutos.toString().length == 1 ? minutos + "0" : minutos));
		hora_ingreso = contador(hora_ingreso);
	}

	// Reviso si existe un horario asignado a un turno, si existe lo elimino del array para que no pueda seleccionarse
	let turnos = JSON.parse(localStorage.getItem(medicoSeleccionado.id));
	let horariosAsignados = [];

	if (turnos != null) {
		turnos.forEach((turnosAsignadas) => {
			if (turnosAsignadas.fecha_turno == (dia.toString().length == 1 ? "0" + dia : dia) + "/" + mes + "/" + anio) {
				horariosAsignados = turnosAsignadas.turno;
			}
		});
	}

	if (horariosAsignados.length > 0) {
		horariosAsignados.forEach((turno) => {
			rangoHorario.find((franjaHoraria, key) => {
				if (franjaHoraria == turno.horario_turno) {
					rangoHorario.splice(key, 1)
				}
			})
		});
	}

	return rangoHorario;
}

// Agrego 30 minutos al horario de inicio, para conseguir el rango de atención
function contador(franja) {
	var sumarMinutos = 30;
	var min = franja.getMinutes();
	franja.setMinutes(min + sumarMinutos);
	return franja;
}

// FALTA RECUPERAR EL USUARIO
form.addEventListener('submit', async e => {
	e.preventDefault()

	let respuesta

	let claves_form = {
		'nombre_completo': document.getElementById('nombre_completo').value,
		'dni': document.getElementById('dni').value,
		'telefono': document.getElementById('telefono').value,
		'es_obra_social': document.getElementById('es_obra_social').checked,
		'derivacion': document.querySelector('input[name="derivacion"]:checked').value,
		'adjunto_derivacion': document.getElementById('adjunto_derivacion').value,
	}

	if (validacionBlur(claves_form)) {
		claves_form.horario_turno = new Date(fechaCompleta + ' ' + document.getElementById('horario').value)
		claves_form.medico_id = medicoSeleccionado.id

		claves_form.usuario_id = recuperarUser()

		const res_db = await fetch('/turnero', {
			method: 'POST',
			headers: {
				"Content-Type": 'application/json'
			},
			body: JSON.stringify(claves_form)
		})
			.then(res => res.json())
			.then(data => respuesta = data)


		if (respuesta.estado != 'validacion') {
			const Toast = Swal.mixin({
				toast: true,
				position: "top-end",
				showConfirmButton: false,
				timer: 1200,
				timerProgressBar: true,
				didOpen: (toast) => {
					toast.onmouseenter = Swal.stopTimer;
					toast.onmouseleave = Swal.resumeTimer;
				}
			});
			Toast.fire({
				icon: `${respuesta.estado}`,
				title: `${respuesta.mensaje}`
			});

			if (respuesta.estado == 'success') {
				setTimeout(() => {
					form.reset()
					window.location.href = '/turnero'
				}, 1000);
			}
		} else {
			let msj_error = JSON.parse(respuesta.mensajes)
			// Muestro los errores del servidor
			Object.entries(msj_error).forEach(([key, value]) => {
				document.getElementById('error_' + key).innerHTML = value
				document.getElementById('error_' + key).setAttribute('style', 'color:red; font-weight: 700;')
			});
		}



	}



})

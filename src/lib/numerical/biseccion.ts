import { ErrorDeMetodo, type Evaluador, type ResultadoMetodo } from './types';

interface ParamsBiseccion {
	a: number;
	b: number;
	tolerancia: number;
	maxIteraciones: number;
}

export function biseccion(f: Evaluador, { a, b, tolerancia, maxIteraciones }: ParamsBiseccion): ResultadoMetodo {
	if (a >= b) {
		throw new ErrorDeMetodo('El límite inferior (a) debe ser menor que el límite superior (b).', ['a', 'b']);
	}

	// Validación del Teorema de Bolzano
	if (f(a) * f(b) >= 0) {
		throw new ErrorDeMetodo('f(a) y f(b) deben tener signos opuestos. No se garantiza una raíz en este intervalo.', [
			'a',
			'b',
			'funcion'
		]);
	}

	const iteraciones = [];
	let cPrevio: number | null = null;
	let raiz = a;

	for (let i = 1; i <= maxIteraciones; i++) {
		const c = (a + b) / 2;
		const fc = f(c);
		// Sin punto medio previo no hay error que calcular (iter 1 => null)
		const error = cPrevio === null ? null : Math.abs((c - cPrevio) / c) * 100;

		iteraciones.push({ iter: i, x: c, fx: fc, error });

		if ((error !== null && error < tolerancia) || fc === 0) {
			return { raiz: c, iteraciones, convergio: true };
		}

		// Reasignamos los límites
		if (f(a) * fc < 0) {
			b = c;
		} else {
			a = c;
		}
		cPrevio = c;
		raiz = c;
	}

	return { raiz, iteraciones, convergio: false };
}

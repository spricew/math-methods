import { ErrorDeMetodo, type Evaluador, type ResultadoMetodo } from './types';

interface ParamsSecante {
	x0: number;
	x1: number;
	tolerancia: number;
	maxIteraciones: number;
}

export function secante(f: Evaluador, { x0, x1, tolerancia, maxIteraciones }: ParamsSecante): ResultadoMetodo {
	const iteraciones = [];
	let anterior = x0;
	let actual = x1;
	let raiz = x1;

	for (let i = 1; i <= maxIteraciones; i++) {
		const fAnterior = f(anterior);
		const fActual = f(actual);

		if (fActual - fAnterior === 0) {
			throw new ErrorDeMetodo('División por cero: f(x0) y f(x1) son iguales. El método de la secante falla con estos valores.', [
				'x0',
				'x1'
			]);
		}

		const xNuevo = actual - fActual * ((actual - anterior) / (fActual - fAnterior));
		const error = Math.abs((xNuevo - actual) / xNuevo) * 100;

		iteraciones.push({ iter: i, x: xNuevo, fx: f(xNuevo), error });

		if (error < tolerancia || f(xNuevo) === 0) {
			return { raiz: xNuevo, iteraciones, convergio: true };
		}
		anterior = actual;
		actual = xNuevo;
		raiz = xNuevo;
	}

	return { raiz, iteraciones, convergio: false };
}

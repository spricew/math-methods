import { ErrorDeMetodo, type Evaluador, type ResultadoMetodo } from './types';

interface ParamsNewton {
	x0: number;
	tolerancia: number;
	maxIteraciones: number;
}

export function newtonRaphson(
	f: Evaluador,
	df: Evaluador,
	{ x0, tolerancia, maxIteraciones }: ParamsNewton
): ResultadoMetodo {
	const iteraciones = [];
	let xPrevio = x0;
	let raiz = x0;

	for (let i = 1; i <= maxIteraciones; i++) {
		const fx = f(xPrevio);
		const dfx = df(xPrevio);

		if (!Number.isFinite(dfx)) {
			throw new ErrorDeMetodo(`La derivada no es finita en x = ${xPrevio}. Prueba otro valor inicial o indica f'(x).`, [
				'derivada'
			]);
		}
		if (dfx === 0) {
			throw new ErrorDeMetodo(`La derivada es cero en x = ${xPrevio}. El método de Newton-Raphson falla en este punto.`, [
				'derivada'
			]);
		}

		const xNuevo = xPrevio - fx / dfx;
		const error = Math.abs((xNuevo - xPrevio) / xNuevo) * 100;

		iteraciones.push({ iter: i, x: xNuevo, fx: f(xNuevo), error });

		if (error < tolerancia || f(xNuevo) === 0) {
			return { raiz: xNuevo, iteraciones, convergio: true };
		}
		xPrevio = xNuevo;
		raiz = xNuevo;
	}

	return { raiz, iteraciones, convergio: false };
}

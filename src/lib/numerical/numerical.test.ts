import { describe, expect, it } from 'vitest';
import { biseccion } from './biseccion';
import { newtonRaphson } from './newton';
import { secante } from './secante';
import { ErrorDeMetodo, type Evaluador } from './types';

// f(x) = x² - 4, raíces en x = ±2
const cuadratica: Evaluador = (x) => x * x - 4;
const derivadaCuadratica: Evaluador = (x) => 2 * x;

describe('biseccion', () => {
	it('converge a la raíz positiva de x² - 4', () => {
		const r = biseccion(cuadratica, { a: 0, b: 3, tolerancia: 0.01, maxIteraciones: 50 });

		expect(r.convergio).toBe(true);
		expect(Math.abs(r.raiz - 2)).toBeLessThan(0.1);
		expect(r.iteraciones.length).toBeGreaterThan(0);
	});

	it('la primera iteración no tiene error calculable', () => {
		const r = biseccion(cuadratica, { a: 0, b: 3, tolerancia: 0.01, maxIteraciones: 50 });

		expect(r.iteraciones[0].error).toBeNull();
	});

	it('rechaza intervalos sin cambio de signo (Teorema de Bolzano)', () => {
		expect(() => biseccion(cuadratica, { a: 3, b: 5, tolerancia: 0.01, maxIteraciones: 10 })).toThrow(ErrorDeMetodo);
	});

	it('rechaza intervalos invertidos', () => {
		expect(() => biseccion(cuadratica, { a: 3, b: 0, tolerancia: 0.01, maxIteraciones: 10 })).toThrow(
			/menor que el límite superior/
		);
	});
});

describe('newtonRaphson', () => {
	it('converge a la raíz positiva de x² - 4', () => {
		const r = newtonRaphson(cuadratica, derivadaCuadratica, { x0: 3, tolerancia: 0.001, maxIteraciones: 20 });

		expect(r.convergio).toBe(true);
		expect(Math.abs(r.raiz - 2)).toBeLessThan(1e-6);
	});

	it('falla cuando la derivada se anula en el punto inicial', () => {
		expect(() => newtonRaphson(cuadratica, derivadaCuadratica, { x0: 0, tolerancia: 0.001, maxIteraciones: 10 })).toThrow(
			ErrorDeMetodo
		);
	});
});

describe('secante', () => {
	it('converge a la raíz positiva de x² - 4', () => {
		const r = secante(cuadratica, { x0: 3, x1: 2.5, tolerancia: 0.001, maxIteraciones: 20 });

		expect(r.convergio).toBe(true);
		expect(Math.abs(r.raiz - 2)).toBeLessThan(1e-6);
	});

	it('falla cuando f(x0) y f(x1) son iguales', () => {
		const constante: Evaluador = () => 5;

		expect(() => secante(constante, { x0: 1, x1: 2, tolerancia: 0.001, maxIteraciones: 10 })).toThrow(ErrorDeMetodo);
	});
});

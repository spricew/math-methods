import { ErrorDeMetodo, type Evaluador } from './types';

/** Envuelve un evaluador de mathjs garantizando resultados numéricos finitos */
export function crearFuncionSegura(evaluar: (x: number) => unknown): Evaluador {
	return (x: number): number => {
		const y = evaluar(x);
		if (typeof y !== 'number' || !Number.isFinite(y)) {
			throw new ErrorDeMetodo(`f(${x}) no produce un valor finito (obtuvo ${y}). Revisa la función o los valores iniciales.`);
		}
		return y;
	};
}

/** Lee y valida un campo numérico del formulario */
export function leerNumero(datos: FormData, campo: string, etiqueta = `El valor de ${campo}`): number {
	const valor = parseFloat(datos.get(campo) as string);
	if (!Number.isFinite(valor)) {
		throw new ErrorDeMetodo(`${etiqueta} debe ser un número válido.`, [campo]);
	}
	return valor;
}

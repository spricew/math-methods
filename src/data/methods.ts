export type MethodId = 'newton-raphson' | 'bisection' | 'secant';

export type AnchoCampo = 'mitad' | 'completo';

export interface CampoMetodo {
	nombre: string;
	label: string;
	placeholder: string;
	tipo?: 'text' | 'number';
	paso?: string;
	requerido?: boolean;
	ancho: AnchoCampo;
}

export interface Metodo {
	id: MethodId;
	slug: string;
	titulo: string;
	descripcion: string;
	campos: CampoMetodo[];
}

/**
 * Única fuente de verdad sobre los métodos numéricos.
 * Solo contiene datos serializables para poder importarse
 * tanto en el servidor (páginas) como en el cliente (script).
 */
export const METHODS: Metodo[] = [
	{
		id: 'newton-raphson',
		slug: 'newton-raphson',
		titulo: 'Newton-Raphson',
		descripcion:
			'Un método poderoso para encontrar raíces utilizando la derivada de la función para una convergencia rápida y cuadrática cerca de la solución.',
		campos: [
			{
				nombre: 'x0',
				label: 'Valor Inicial (x0)',
				placeholder: '1',
				tipo: 'number',
				paso: 'any',
				requerido: true,
				ancho: 'completo'
			},
			{
				nombre: 'derivada',
				label: "Derivada f'(x) (Opcional)",
				placeholder: 'ej. 3*x^2 - 2',
				tipo: 'text',
				ancho: 'completo'
			}
		]
	},
	{
		id: 'bisection',
		slug: 'bisection',
		titulo: 'Bisección',
		descripcion:
			'Un método robusto y fiable basado en el Teorema del Valor Intermedio que divide repetidamente el intervalo por la mitad para atrapar la raíz.',
		campos: [
			{ nombre: 'a', label: 'Límite Inferior (a)', placeholder: '0', tipo: 'number', paso: 'any', requerido: true, ancho: 'mitad' },
			{ nombre: 'b', label: 'Límite Superior (b)', placeholder: '1', tipo: 'number', paso: 'any', requerido: true, ancho: 'mitad' }
		]
	},
	{
		id: 'secant',
		slug: 'secant',
		titulo: 'Secante',
		descripcion:
			'Una alternativa elegante a Newton-Raphson que elimina la necesidad de diferenciación manual mediante el uso de diferencias finitas.',
		campos: [
			{ nombre: 'x0', label: 'Valor Inicial 1 (x0)', placeholder: '0', tipo: 'number', paso: 'any', requerido: true, ancho: 'mitad' },
			{ nombre: 'x1', label: 'Valor Inicial 2 (x1)', placeholder: '1', tipo: 'number', paso: 'any', requerido: true, ancho: 'mitad' }
		]
	}
];

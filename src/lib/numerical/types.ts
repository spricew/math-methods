export type Evaluador = (x: number) => number;

export interface Iteracion {
	iter: number;
	x: number;
	fx: number;
	/** Error relativo (%) o null si no aplica (primera iteración de bisección) */
	error: number | null;
}

export interface ResultadoMetodo {
	raiz: number;
	iteraciones: Iteracion[];
	/** true solo si se cumplió el criterio de parada, no si se agotó maxIteraciones */
	convergio: boolean;
}

/** Error de un método numérico que sabe qué campos del formulario lo causaron */
export class ErrorDeMetodo extends Error {
	campos: string[];

	constructor(mensaje: string, campos: string[] = []) {
		super(mensaje);
		this.name = 'ErrorDeMetodo';
		this.campos = campos;
	}
}

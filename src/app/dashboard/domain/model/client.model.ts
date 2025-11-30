export interface Client {
    id?: number;
    dni: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    email: string;
    ingresoMensual: number;
    dependientes: number;
    scoreRiesgo: number;
    gastoMensualAprox: number;
    usuarioId: number;
    situacionLaboral: string;
    estadoCivil: string;
}

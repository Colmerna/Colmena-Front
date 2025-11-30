export interface Financing {
    id?: number;
    montoPrestamo: number;
    tasaInteresAnual: number;
    plazoMeses: number;
    fechaInicio: string; // ISO date string
    clienteId: number;
    proyectoId: number;
    bancoId: number;
    seguroDesgravamenMensual: number;
    seguroInmuebleAnual: number;
    estadoCredito: string;
}

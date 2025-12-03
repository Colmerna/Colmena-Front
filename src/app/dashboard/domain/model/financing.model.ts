export interface Financing {
    id?: number;
    clienteId: number;
    proyectoId: number;
    bancoId: number;

    moneda: string;
    tipoTasa: string;
    tasaNominal?: number;
    tasaEfectiva?: number;
    baseTiempo: string;
    capitalizacion: string;

    precioVentaActivo?: number;

    cuotaInicial: number;
    bonoTecho?: number;

    graciaTipo: string;
    graciaMeses?: number;

    plazoMeses: number;
    montoPrestamo: number;

    costosNotariales?: number;
    costosRegistrales?: number;
    tasacion?: number;
    comisionEstudio?: number;
    comisionActivacion?: number;

    comisionPeriodica?: number;
    portes?: number;
    gastosAdmPeriodicos?: number;
    porcentajeSeguroDesgravamen?: number;
    porcentajeSeguroRiesgo?: number;

    tasaDescuentoAnual?: number;

    frecuenciaPagoDias: number;
    diasPorAnio: number;

    estadoCredito: string;

    fechaCreacion?: string;
    fechaAprobacion?: string;

    // campos derivados
    tasaInteresAnual?: number;
    fechaInicio?: string;
    seguroDesgravamenMensual?: number;
    seguroInmuebleAnual?: number;
}

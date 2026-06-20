package br.gov.ibge.bme.model;

public enum AccessLevel {
    /** Visualizar resultados agregados */
    READ,
    /** Exportar resultados (CSV, XLSX, JSON) */
    EXPORT,
    /** Gerenciar consultas oficiais desta pesquisa */
    MANAGE
}

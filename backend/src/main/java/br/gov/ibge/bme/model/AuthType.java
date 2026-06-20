package br.gov.ibge.bme.model;

public enum AuthType {
    /** Active Directory corporativo do IBGE (LDAP/Kerberos) */
    AD,
    /** Autenticação via gov.br (OAuth 2.0 / OpenID Connect) */
    GOVBR,
    /** Conta local do BME com senha armazenada */
    BME
}

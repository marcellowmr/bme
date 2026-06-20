package br.gov.ibge.bme.model;

import jakarta.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * Capacidade funcional concedida a um perfil.
 * Exemplos: QUERY_EXECUTE, EXPORT_CSV, OFFICIAL_QUERY_MANAGE, ADMIN_USERS.
 */
@Entity
@Table(name = "BME_PRIVILEGE",
       uniqueConstraints = @UniqueConstraint(name = "UK_PRIVILEGE_CODE", columnNames = "CODE"))
public class Privilege {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_PRIVILEGE")
    @SequenceGenerator(name = "SEQ_PRIVILEGE", sequenceName = "SEQ_BME_PRIVILEGE", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    /** Código único legível por máquina, ex: QUERY_EXECUTE, EXPORT_CSV */
    @Column(name = "CODE", nullable = false, length = 60)
    private String code;

    @Column(name = "DESCRIPTION", nullable = false, length = 200)
    private String description;

    /**
     * Tipo do recurso protegido: FEATURE (funcionalidade) ou RESEARCH (pesquisa).
     * Quando RESEARCH, o controle fino é feito via ProfileResearch.
     */
    @Column(name = "RESOURCE_TYPE", nullable = false, length = 20)
    private String resourceType;

    @ManyToMany(mappedBy = "privileges")
    private Set<Profile> profiles = new LinkedHashSet<>();

    // ── getters / setters ──

    public Long getId() { return id; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getResourceType() { return resourceType; }
    public void setResourceType(String resourceType) { this.resourceType = resourceType; }
    public Set<Profile> getProfiles() { return profiles; }
}

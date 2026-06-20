package br.gov.ibge.bme.model;

import jakarta.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * Pesquisa do IBGE disponível no BME (ex: Censo 2010, PNAD, POF).
 * O acesso de um perfil a uma pesquisa é controlado por {@link ProfileResearch}.
 */
@Entity
@Table(name = "BME_RESEARCH",
       uniqueConstraints = @UniqueConstraint(name = "UK_RESEARCH_CODE", columnNames = "CODE"))
public class Research {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_RESEARCH")
    @SequenceGenerator(name = "SEQ_RESEARCH", sequenceName = "SEQ_BME_RESEARCH", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    /** Código interno, ex: CD2010, PNAD2022, POF2018 */
    @Column(name = "CODE", nullable = false, length = 30)
    private String code;

    @Column(name = "NAME", nullable = false, length = 200)
    private String name;

    @Column(name = "DESCRIPTION", length = 2000)
    private String description;

    @Column(name = "ACTIVE", nullable = false, length = 1)
    private String active = "S";

    @OneToMany(mappedBy = "research", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProfileResearch> profileAccesses = new LinkedHashSet<>();

    // ── getters / setters ──

    public Long getId() { return id; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public boolean isActive() { return "S".equals(active); }
    public void setActive(boolean active) { this.active = active ? "S" : "N"; }
    public Set<ProfileResearch> getProfileAccesses() { return profileAccesses; }
}

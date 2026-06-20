package br.gov.ibge.bme.model;

import jakarta.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Perfil de acesso ao BME.
 * Um perfil acumula {@link Privilege}s funcionais e acesso a {@link Research}s específicas.
 *
 * Exemplos típicos:
 *   PUBLIC     – navega consultas oficiais, executa pesquisas liberadas
 *   RESEARCHER – interface avançada + acesso a pesquisas restritas + exportação
 *   ADMIN      – gestão de usuários, perfis e conteúdo oficial
 */
@Entity
@Table(name = "BME_PROFILE",
       uniqueConstraints = @UniqueConstraint(name = "UK_PROFILE_CODE", columnNames = "CODE"))
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_PROFILE")
    @SequenceGenerator(name = "SEQ_PROFILE", sequenceName = "SEQ_BME_PROFILE", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @Column(name = "CODE", nullable = false, length = 30)
    private String code;

    @Column(name = "NAME", nullable = false, length = 100)
    private String name;

    @Column(name = "DESCRIPTION", length = 500)
    private String description;

    /** Habilita a interface avançada de pesquisador */
    @Column(name = "RESEARCHER_UI", nullable = false, length = 1)
    private String researcherUi = "N";

    @Column(name = "ACTIVE", nullable = false, length = 1)
    private String active = "S";

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "BME_PROFILE_PRIVILEGE",
        joinColumns        = @JoinColumn(name = "PROFILE_ID",    foreignKey = @ForeignKey(name = "FK_PP_PROFILE")),
        inverseJoinColumns = @JoinColumn(name = "PRIVILEGE_ID",  foreignKey = @ForeignKey(name = "FK_PP_PRIVILEGE"))
    )
    private Set<Privilege> privileges = new LinkedHashSet<>();

    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProfileResearch> researchAccesses = new LinkedHashSet<>();

    @OneToMany(mappedBy = "profile")
    private Set<User> users = new LinkedHashSet<>();

    // ── helpers ──

    public boolean hasPrivilege(String code) {
        return privileges.stream().anyMatch(p -> p.getCode().equals(code));
    }

    public Set<Research> getResearchesWithLevel(AccessLevel level) {
        return researchAccesses.stream()
                .filter(pr -> pr.getAccessLevel().ordinal() >= level.ordinal())
                .map(ProfileResearch::getResearch)
                .collect(Collectors.toSet());
    }

    public void grantResearch(Research research, AccessLevel level) {
        researchAccesses.add(new ProfileResearch(this, research, level));
    }

    // ── getters / setters ──

    public Long getId() { return id; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public boolean isResearcherUi() { return "S".equals(researcherUi); }
    public void setResearcherUi(boolean v) { this.researcherUi = v ? "S" : "N"; }
    public boolean isActive() { return "S".equals(active); }
    public void setActive(boolean active) { this.active = active ? "S" : "N"; }
    public Set<Privilege> getPrivileges() { return privileges; }
    public Set<ProfileResearch> getResearchAccesses() { return researchAccesses; }
}

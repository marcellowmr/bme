package br.gov.ibge.bme.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Usuário do BME. Suporta três tipos de autenticação:
 *   AD     – credenciais validadas no Active Directory do IBGE (LDAP)
 *   GOVBR  – identidade federada via gov.br (OAuth2/OIDC); externalId = CPF
 *   BME    – conta local com senha hash (bcrypt)
 *
 * O perfil ({@link Profile}) determina quais pesquisas e funcionalidades
 * o usuário pode acessar.
 */
@Entity
@Table(name = "BME_USER",
       uniqueConstraints = {
           @UniqueConstraint(name = "UK_USER_USERNAME",    columnNames = "USERNAME"),
           @UniqueConstraint(name = "UK_USER_EMAIL",       columnNames = "EMAIL"),
           @UniqueConstraint(name = "UK_USER_EXTERNAL_ID", columnNames = {"AUTH_TYPE", "EXTERNAL_ID"})
       })
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_USER")
    @SequenceGenerator(name = "SEQ_USER", sequenceName = "SEQ_BME_USER", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    /**
     * Login único: para AD = "IBGE\nome.sobrenome", para gov.br = CPF mascarado,
     * para BME = e-mail ou alias escolhido.
     */
    @Column(name = "USERNAME", nullable = false, length = 100)
    private String username;

    @Column(name = "FULL_NAME", nullable = false, length = 200)
    private String fullName;

    @Column(name = "EMAIL", nullable = false, length = 200)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "AUTH_TYPE", nullable = false, length = 10)
    private AuthType authType;

    /**
     * Identificador no sistema de origem:
     *   AD    → objectGUID ou sAMAccountName
     *   GOVBR → sub do token OIDC (geralmente CPF)
     *   BME   → null (autenticação própria)
     */
    @Column(name = "EXTERNAL_ID", length = 100)
    private String externalId;

    /** Armazenado apenas quando authType = BME. Nunca expor em serialização. */
    @Column(name = "PASSWORD_HASH", length = 72)
    private String passwordHash;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "PROFILE_ID", nullable = false,
                foreignKey = @ForeignKey(name = "FK_USER_PROFILE"))
    private Profile profile;

    @Column(name = "ACTIVE", nullable = false, length = 1)
    private String active = "S";

    @Column(name = "CREATED_AT", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "LAST_LOGIN")
    private LocalDateTime lastLogin;

    @Column(name = "FAILED_LOGINS", nullable = false)
    private int failedLogins = 0;

    @Column(name = "LOCKED_UNTIL")
    private LocalDateTime lockedUntil;

    @PrePersist
    private void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    // ── helpers ──

    public boolean isActive() { return "S".equals(active); }
    public void setActive(boolean active) { this.active = active ? "S" : "N"; }

    public boolean isLocked() {
        return lockedUntil != null && LocalDateTime.now().isBefore(lockedUntil);
    }

    public void recordLoginSuccess() {
        this.lastLogin = LocalDateTime.now();
        this.failedLogins = 0;
        this.lockedUntil = null;
    }

    public void recordLoginFailure(int maxAttempts, int lockMinutes) {
        this.failedLogins++;
        if (this.failedLogins >= maxAttempts) {
            this.lockedUntil = LocalDateTime.now().plusMinutes(lockMinutes);
        }
    }

    /** Delega ao perfil: pesquisas acessíveis com pelo menos READ */
    public boolean canAccessResearch(Long researchId) {
        return profile.getResearchAccesses().stream()
                .anyMatch(pr -> pr.getResearch().getId().equals(researchId));
    }

    public boolean canExportResearch(Long researchId) {
        return profile.getResearchAccesses().stream()
                .anyMatch(pr -> pr.getResearch().getId().equals(researchId)
                             && pr.getAccessLevel().ordinal() >= AccessLevel.EXPORT.ordinal());
    }

    // ── getters / setters ──

    public Long getId() { return id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public AuthType getAuthType() { return authType; }
    public void setAuthType(AuthType authType) { this.authType = authType; }
    public String getExternalId() { return externalId; }
    public void setExternalId(String externalId) { this.externalId = externalId; }
    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public Profile getProfile() { return profile; }
    public void setProfile(Profile profile) { this.profile = profile; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getLastLogin() { return lastLogin; }
    public int getFailedLogins() { return failedLogins; }
    public LocalDateTime getLockedUntil() { return lockedUntil; }
}

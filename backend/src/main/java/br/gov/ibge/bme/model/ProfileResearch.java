package br.gov.ibge.bme.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * Associação entre {@link Profile} e {@link Research}, com nível de acesso.
 * Cada perfil pode ter acesso a um conjunto diferente de pesquisas
 * e com diferentes permissões (READ, EXPORT, MANAGE).
 */
@Entity
@Table(name = "BME_PROFILE_RESEARCH",
       uniqueConstraints = @UniqueConstraint(name = "UK_PROFILE_RESEARCH",
               columnNames = {"PROFILE_ID", "RESEARCH_ID"}))
public class ProfileResearch {

    @EmbeddedId
    private ProfileResearchId id = new ProfileResearchId();

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId("profileId")
    @JoinColumn(name = "PROFILE_ID", nullable = false,
                foreignKey = @ForeignKey(name = "FK_PR_PROFILE"))
    private Profile profile;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId("researchId")
    @JoinColumn(name = "RESEARCH_ID", nullable = false,
                foreignKey = @ForeignKey(name = "FK_PR_RESEARCH"))
    private Research research;

    @Enumerated(EnumType.STRING)
    @Column(name = "ACCESS_LEVEL", nullable = false, length = 10)
    private AccessLevel accessLevel = AccessLevel.READ;

    public ProfileResearch() {}

    public ProfileResearch(Profile profile, Research research, AccessLevel accessLevel) {
        this.profile = profile;
        this.research = research;
        this.accessLevel = accessLevel;
        this.id = new ProfileResearchId(profile.getId(), research.getId());
    }

    public Profile getProfile() { return profile; }
    public Research getResearch() { return research; }
    public AccessLevel getAccessLevel() { return accessLevel; }
    public void setAccessLevel(AccessLevel accessLevel) { this.accessLevel = accessLevel; }

    // ── composite PK ──

    @Embeddable
    public static class ProfileResearchId implements Serializable {
        @Column(name = "PROFILE_ID") private Long profileId;
        @Column(name = "RESEARCH_ID") private Long researchId;

        public ProfileResearchId() {}
        public ProfileResearchId(Long profileId, Long researchId) {
            this.profileId = profileId;
            this.researchId = researchId;
        }
        @Override public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof ProfileResearchId p)) return false;
            return Objects.equals(profileId, p.profileId) && Objects.equals(researchId, p.researchId);
        }
        @Override public int hashCode() { return Objects.hash(profileId, researchId); }
    }
}

package com.codepathacademy.service;

import com.codepathacademy.entity.*;
import com.codepathacademy.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GamificationService {

    private static final Logger logger = LoggerFactory.getLogger(GamificationService.class);

    private final UserRepository userRepository;
    private final AchievementRepository achievementRepository;
    private final UserAchievementRepository userAchievementRepository;
    private final LearningActivityRepository learningActivityRepository;

    @Transactional
    public void addXp(User user, int xpAmount, String activityType, String description) {
        int oldXp = user.getXp() != null ? user.getXp() : 0;
        int newXp = oldXp + xpAmount;
        user.setXp(newXp);
        user.setLevel(calculateLevel(newXp));

        // Update streak
        updateDailyStreak(user);

        userRepository.save(user);

        // Record activity
        LearningActivity activity = LearningActivity.builder()
                .user(user)
                .activityType(activityType)
                .description(description)
                .xpEarned(xpAmount)
                .activityDate(LocalDate.now())
                .build();
        learningActivityRepository.save(activity);

        logger.info("Awarded {} XP to user {}. New total: {} XP (Level: {})",
                xpAmount, user.getUsername(), newXp, user.getLevel());
    }

    @Transactional
    public void checkAndUnlockAchievement(User user, String badgeKey) {
        Optional<Achievement> achievementOpt = achievementRepository.findByBadgeKey(badgeKey);
        if (achievementOpt.isPresent()) {
            Achievement achievement = achievementOpt.get();
            if (!userAchievementRepository.existsByUserIdAndAchievementId(user.getId(), achievement.getId())) {
                UserAchievement userAchievement = UserAchievement.builder()
                        .user(user)
                        .achievement(achievement)
                        .build();
                userAchievementRepository.save(userAchievement);

                // Award XP for the badge
                addXp(user, achievement.getXpReward(), "ACHIEVEMENT_UNLOCKED", "Unlocked achievement: " + achievement.getTitle());
                logger.info("User {} unlocked badge: {}", user.getUsername(), badgeKey);
            }
        }
    }

    public void updateDailyStreak(User user) {
        LocalDate today = LocalDate.now();
        LocalDate lastActive = user.getLastActiveDate();

        if (lastActive == null) {
            user.setStreakDays(1);
        } else if (lastActive.equals(today.minusDays(1))) {
            user.setStreakDays((user.getStreakDays() != null ? user.getStreakDays() : 0) + 1);
        } else if (!lastActive.equals(today)) {
            long daysBetween = ChronoUnit.DAYS.between(lastActive, today);
            if (daysBetween > 1) {
                user.setStreakDays(1); // Streak reset
            }
        }
        user.setLastActiveDate(today);
    }

    public String calculateLevel(int xp) {
        if (xp >= 5000) return "Software Engineer";
        if (xp >= 3000) return "Full Stack Developer";
        if (xp >= 1500) return "Advanced Developer";
        if (xp >= 750) return "Developer";
        if (xp >= 250) return "Explorer";
        return "Beginner";
    }

    public int getNextLevelThreshold(int xp) {
        if (xp >= 5000) return 5000;
        if (xp >= 3000) return 5000;
        if (xp >= 1500) return 3000;
        if (xp >= 750) return 1500;
        if (xp >= 250) return 750;
        return 250;
    }
}

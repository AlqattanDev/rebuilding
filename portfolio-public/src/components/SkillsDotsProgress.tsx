import React from 'react';
import { Skill } from '../types';

interface SkillsDotsProgressProps {
  skills: Skill[];
  className?: string;
}

export const SkillsDotsProgress: React.FC<SkillsDotsProgressProps> = ({
  skills,
  className = ''
}) => {
  // Convert level to numeric value (0-100)
  const getLevelValue = (skill: Skill): number => {
    if (skill.proficiency) return skill.proficiency;

    const levelMap: Record<string, number> = {
      'beginner': 25,
      'intermediate': 50,
      'advanced': 75,
      'expert': 90,
    };

    return levelMap[skill.level] || 50;
  };

  // Generate dot-based progress (out of 10)
  const renderDots = (value: number): string => {
    const filled = Math.round(value / 10); // 0-10 dots
    const empty = 10 - filled;

    return '●'.repeat(filled) + '○'.repeat(empty);
  };

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className={`skills-dots-progress ${className}`}>
      {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
        <div key={category} className="skills-category mb-6">
          {/* Category header */}
          {Object.keys(skillsByCategory).length > 1 && (
            <div className="category-name font-mono text-[9pt] text-terminal-muted mb-2 tracking-wide">
              [ {category.toUpperCase()} ]
            </div>
          )}

          {/* Skills list */}
          <div className="skills-list flex flex-col gap-3">
            {categorySkills
              .sort((a, b) => a.order - b.order)
              .map((skill) => {
                const levelValue = getLevelValue(skill);

                return (
                  <div
                    key={skill.id}
                    className="skill-item flex items-center gap-4"
                  >
                    <span className="skill-name font-mono text-[9pt] text-terminal-green min-w-[180px] uppercase">
                      {skill.name}
                    </span>
                    <span className="skill-dots font-mono text-[10pt] tracking-[2px] text-terminal-green">
                      {renderDots(levelValue)}
                    </span>
                    <span className="skill-percent font-mono text-[9pt] text-terminal-muted ml-2">
                      {levelValue}%
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsDotsProgress;

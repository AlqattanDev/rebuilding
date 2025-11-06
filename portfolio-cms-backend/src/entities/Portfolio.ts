import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './User.js';
import { Project } from './Project.js';
import { Skill } from './Skill.js';
import { Experience } from './Experience.js';
import { Theme } from './Theme.js';

@Entity('portfolios')
export class Portfolio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  slug: string;

  @Column({ type: 'varchar', default: 'professional' })
  template: 'professional' | 'creative' | 'minimal' | 'custom';

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  bio: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  location: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'jsonb', default: '{}' })
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };

  @Column({ type: 'jsonb', default: '{}' })
  sections: Array<{
    id: string;
    name: string;
    title: string;
    visible: boolean;
    order: number;
    layout: 'grid' | 'list' | 'carousel' | 'timeline';
    backgroundColor?: string;
    paddingTop: number;
    paddingBottom: number;
    showAnimation: boolean;
    animation?: 'fade-in' | 'slide-up' | 'zoom-in' | 'none';
  }>;

  @Column({ type: 'boolean', default: false })
  published: boolean;

  @Column({ type: 'integer', default: 0 })
  views: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.portfolios, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Project, (project) => project.portfolio, {
    cascade: true,
    eager: false,
  })
  projects: Project[];

  @OneToMany(() => Skill, (skill) => skill.portfolio, {
    cascade: true,
    eager: false,
  })
  skills: Skill[];

  @OneToMany(() => Experience, (experience) => experience.portfolio, {
    cascade: true,
    eager: false,
  })
  experiences: Experience[];

  @ManyToOne(() => Theme, { nullable: true })
  @JoinColumn({ name: 'themeId' })
  theme: Theme;

  @Column({ type: 'uuid', nullable: true })
  themeId: string;

  constructor(partial?: Partial<Portfolio>) {
    Object.assign(this, partial);
  }
}

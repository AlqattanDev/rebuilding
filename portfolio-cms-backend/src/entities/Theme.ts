import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('themes')
export class Theme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'jsonb' })
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textMuted: string;
    border: string;
    success: string;
    danger: string;
    warning: string;
  };

  @Column({ type: 'jsonb' })
  typography: {
    fontFamily: string;
    headingFont: string;
    bodySize: number;
    headingSize: number;
    lineHeight: number;
  };

  @Column({ type: 'boolean', default: false })
  darkMode: boolean;

  @Column({ type: 'integer', default: 8 })
  spacing: number;

  @Column({ type: 'integer', default: 8 })
  borderRadius: number;

  @Column({ type: 'varchar', nullable: true })
  customCSS: string;

  @Column({ type: 'boolean', default: false })
  isDefault: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial?: Partial<Theme>) {
    Object.assign(this, partial);
  }
}

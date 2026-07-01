export interface TSkill {
  pkg: string;
  desc: string;
  iconUrl?: string | null;
  iconName?: string | null;
  inv?: boolean;
}

export interface TCategory {
  id: string;
  path: string;
  accent: string;
  hex: string;
  list: TSkill[];
}

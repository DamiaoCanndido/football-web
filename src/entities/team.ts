export interface CreateTeam {
  name: string;
  code: string;
  type: 'amateur' | 'club' | 'selection';
  country?: string;
  logo: string;
}

export interface AuthUser {
  user: {
      auth: boolean;
      role: string;
  };
  login: () => {
      auth: boolean;
      role: any;
  };
  logout: () => void;
}
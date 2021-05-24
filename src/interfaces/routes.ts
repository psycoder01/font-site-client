export interface Routes {
  path: string;
  name: string;
  Component: React.FC;
  exact?: boolean;
}

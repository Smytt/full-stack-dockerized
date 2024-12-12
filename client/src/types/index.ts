export type User = {
  username: string;
  techs: Tech[];
};

export type Tech = {
  id: string;
  name: string;
  users: User[];
};

export type Uzytkownik = {
  id: number;
  name: string;
  active: boolean;
  userTypeId: number;
  createdAt: string;
  UserType?: {
    id: number;
    type: string;
  };
};

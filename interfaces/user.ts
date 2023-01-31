export interface IUser {
  uid?: string;
  email?: string;
  password?: string;
  name?: string | null;
  photoURL?: string | null;
  ok?: boolean;
  errorMessage?: string | null;
}

export class Role {
  subscriber?: boolean;
  admin?: boolean;
}

export class User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: Role;
}

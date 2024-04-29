export type Credentials = {
  username: string;
  password: string;
};

export type User = {
  id: string;
  username: string;
  password: string;
};

// Use an in-memory user database for authentication
// Auto-seed with a random username
const db: Map<string, User> = new Map([
  [
    "foo@example.com",
    { id: "0001", username: "foo@example.com", password: "test" },
  ],
]);

/**
 * We leave the password unhashed for now since integrating a proper hashing lib like bcrypt takes some more effort
 * @param password
 */
export function getHash(password: string): string {
  return password;
}

/**
 * Validate the user's credentials by checking them agains the in-memory database
 * @param credentials
 */
export function validateUser(credentials: Credentials) {
  if (!db.has(credentials.username)) throw new Error("Username does not exist");

  const hashedPassword = getHash(credentials.password);

  if (db.get(credentials.username)?.password !== hashedPassword) {
    throw new Error("Invalid credentials.");
  }
}

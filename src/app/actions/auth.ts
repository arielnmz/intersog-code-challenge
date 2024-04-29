import { Credentials, User, validateUser } from "@/auth";

export type LoginFormState = { errors?: string; message?: string } | undefined;

/**
 * Validate the form and log the user in
 * @param state
 * @param formData
 */
export async function signin(
  state: LoginFormState,
  formData: FormData,
): Promise<undefined | LoginFormState> {
  const validatedFields = {
    username: formData.get("email"),
    password: formData.get("password"),
  };

  // If any form fields are invalid, return early
  if (!Object.values(validatedFields).every((v) => !!v))
    return { errors: "Username and password are required!" };

  // Coerce the types for simplicity
  const credentials: Credentials = {
    username: validatedFields.username as string,
    password: validatedFields.password as string,
  };

  try {
    validateUser(credentials);
    return {
      message: "Login successful! TODO: Complete session management",
    };
  } catch (e) {
    return { errors: `Error validating user: ${(e as Error).message}` };
  }
}

import { createAuthClient } from "better-auth/react" // make sure to import from better-auth/react

// 1:33:02
export const { signIn, signUp, signOut, useSession } = createAuthClient({
	// If the auth server is running on the same domain as your client, you can skip this step.
	// baseURL: "http://localhost:3000"
});

"use server";

import { LoginFormValues } from "@/components/auth/login";
import { RegisterFormValues } from "@/components/auth/signup";
import { auth } from "@/lib/auth";

export async function registerUser(data: RegisterFormValues) {
	try {
		console.log("registerUser:", data);

		// call the Better Auth register api
		await auth.api.signUpEmail({
			body: {
				email: data.email,
				password: data.password, // No need to hash password, Better Auth does it for me
				name: `${data.firstName} ${data.lastName}`,
				firstName: data.firstName,
				lastName: data.lastName
			}
		});

		return {
			success: true,
			data: data,
			error: null
		}
	} catch (error) {
		console.log("registerUser:", error);

		return {
			success: false,
			data: null,
			error: "Something went wrong while signin up!"
		}
	}
}

export async function loginUser(data: LoginFormValues) {
	try {
		console.log("loginUser:", data);

		// call the Better Auth register api
		await auth.api.signInEmail({
			body: {
				email: data.email,
				password: data.password, // No need to hash password, Better Auth does it for me
			}
		});

		return {
			success: true,
			data: data,
			error: null
		}
	} catch (error) {
		console.log("registerUser:", error);

		return {
			success: false,
			data: null,
			error: "Something went wrong while signin up!"
		}
	}
}
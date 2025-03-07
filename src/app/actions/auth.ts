import { redirect } from "next/dist/server/api-utils";
import { FormState, LoginFormSchema } from "../lib/definitions";

export async function login(state: FormState, formData: FormData) {
	const validateFields = LoginFormSchema.safeParse({
		email: formData.get('email'),
		password: formData.get('password')
	});

	if (!validateFields.success) {
		return { errors: validateFields.error.flatten().fieldErrors };
	}

	fetch("/api/auth/login", {
		method: "POST",
		body: JSON.stringify({
			email: validateFields.data.email,
			password: validateFields.data.password
		}),
		headers: {
			"Content-Type": "application/json",
		},
	}).then((response) => {
		if (response.status === 200) {
			redirect("/dashboard", 302);
		}
	}
	);
}
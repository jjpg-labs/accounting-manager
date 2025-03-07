import { NextApiRequest, NextApiResponse } from "next";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
	const { email, password } = req.body;

	console.log(`Email: ${email}\nPassword: ${password}`);

	res.status(200).json({ message: "Success" });
}
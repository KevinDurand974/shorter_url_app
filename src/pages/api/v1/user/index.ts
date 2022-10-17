import { getDataSource } from "@ORM";
import { createUser, getUserByUuid, removeUserByUuid } from "@ORM/models";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
	data?: any;
	error?: any;
};

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) => {
	try {
		const method = req.method;
		const datasource = await getDataSource();

		// Create User
		if (method === "POST") {
			const newUser = await createUser(datasource, req.body);
			return res.status(201).json({ data: newUser });
		}
		// Delete User
		else if (method === "DELETE") {
			await removeUserByUuid(datasource, req.body);
			return res.status(204).end();
		}
		// Get User
		else if (method === "GET") {
			const user = await getUserByUuid(datasource, req.body);
			return res.status(200).json({ data: user });
		}
		throw {
			code: 405,
			message: "Method not allowed",
		};
	} catch (err: any) {
		res.status(err.statusCode || 500).json({
			error: { status: err.statusCode || 500, message: err.message },
		});
	}
};

export default handler;

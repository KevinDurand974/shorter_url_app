import { getDataSource } from "@ORM";
import { updateUserEmail } from "@ORM/models";
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

		// Update User Email
		if (method === "PUT") {
			const updatedUser = await updateUserEmail(datasource, req.body);
			return res.status(200).json({ data: updatedUser });
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

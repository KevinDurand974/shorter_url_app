import { getDataSource } from "@ORM";
import { updateUserVip } from "@ORM/models";
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

		// Update User VIP
		if (method === "PUT") {
			await updateUserVip(datasource, req.body);
			return res.status(204).end();
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

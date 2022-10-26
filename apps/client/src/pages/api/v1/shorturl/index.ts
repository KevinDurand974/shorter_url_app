import { getDataSource } from "@ORM";
import { createShortUrl, deleteShortUrl, getShortUrl } from "@ORM/models";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const method = req.method;
		const datasource = await getDataSource();

		// Create Short URL
		if (method === "POST") {
			const newShortUrl = await createShortUrl(datasource, req.body);
			return res.status(201).json({ data: newShortUrl });
		}
		// DELETE Short URL
		else if (method === "DELETE") {
			await deleteShortUrl(datasource, req.body);
			return res.status(204).end();
		}
		// GET Short URL and Redirect
		else if (method === "GET") {
			const url = await getShortUrl(datasource, req.body);
			return res.status(200).json({ data: url });
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

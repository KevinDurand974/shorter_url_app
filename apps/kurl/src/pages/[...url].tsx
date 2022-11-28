import { GetServerSideProps, GetStaticPaths } from "next";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

type ApiError = {
	message: string;
	data: {
		code: string;
		httpStatus: number;
		stack: string;
		path: string;
	};
};

const PageUrl = () => {
	// Normaly you cant be here because of the getServerSideProps
	// but if you are here, go back
	const router = useRouter();
	useEffect(() => {
		router.back();
	}, [router]);

	return null;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	try {
		const url = params?.url as string[] | undefined;
		if (!url) throw new Error("No url provided");
		let paramUrl = url.join("/");
		const { data } = await axios.post(`${process.env.API_URL}/trpc/redirect`, {
			path: paramUrl,
		});

		return {
			redirect: {
				destination: data.result.data,
				permanent: false,
			},
		};
	} catch (err: any) {
		if (err instanceof AxiosError) {
			const {
				message,
				data: { httpStatus },
			} = err.response?.data.error as ApiError;
			let destination = "/notfound";
			switch (httpStatus) {
				case 404:
					destination = "/notfound";
					break;
				case 400:
					destination = "/notavailable";
					break;
				default:
					destination = "/notfound";
					break;
			}

			return {
				props: { message },
				redirect: {
					destination,
					permanent: false,
				},
			};
		}

		return {
			redirect: {
				props: { message: err.message },
				destination: "/notavailable",
				permanent: false,
			},
		};
	}
};

export default PageUrl;

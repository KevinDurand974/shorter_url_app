import axios, { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";

type ApiError = {
	message: string;
	data: {
		code: string;
		httpStatus: number;
		stack: string;
		path: string;
	};
};

type Props = {
	httpStatus: number;
};

const PageUrl = ({ httpStatus }: Props) => {
	return (
		<>
			<Head>
				{httpStatus === 404 ? (
					<>
						<title>What are you doing here? - Kurl</title>
						<meta
							name="description"
							content="This redirect url doesn't exist."
						/>
					</>
				) : (
					<>
						<title>Oops, it doesn&apos;t work - Kurl</title>
						<meta
							name="description"
							content="This redirect url isn't available at this moment."
						/>
					</>
				)}

				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="bg-gradient-to-br from-bg-primary to-bg-secondary w-full h-screen flex justify-center items-center">
				<div className="border-2 border-gray-600 border-opacity-20 p-4 md:p-8 rounded-2xl shadow-lg bg-gradient-to-tl from-transparent to-black/50 transition-all duration-300">
					{httpStatus === 404 ? (
						<>
							<h1 className="text-3xl md:text-5xl lg:text-7xl text-center smallcase text-accent font-rubik tracking-wider transition-all duration-300">
								This url doesn&apos;t exist!
							</h1>
						</>
					) : (
						<>
							<div>
								<h1 className="text-3xl md:text-5xl lg:text-7xl text-center smallcase text-accent font-rubik tracking-wider transition-all duration-300">
									This url is unavailable!
								</h1>
								<p className="text-hover font-extrabold text-center tracking-wide">
									Report this issue to its owner
								</p>
							</div>
						</>
					)}
					<div className="mt-4 text-center">
						<div className="text-text font-semibold">
							You can close this page.
						</div>
					</div>
				</div>
			</main>
		</>
	);
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
				data: { httpStatus },
			} = err.response?.data.error as ApiError;

			return {
				props: { httpStatus },
			};
		}

		return {
			props: { httpStatus: 404 },
		};
	}
};

export default PageUrl;

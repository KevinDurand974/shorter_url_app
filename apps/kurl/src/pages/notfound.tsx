type Props = {
	message: string;
};

const NotFoundPage = (props: Props) => {
	console.log(props);

	return <h1>Not found</h1>;
};

export default NotFoundPage;

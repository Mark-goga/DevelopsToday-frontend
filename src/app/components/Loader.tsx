import {CircleLoader} from "react-spinners";

interface LoaderProps {
	styles: string;
}

const Loader = ({styles}: LoaderProps) => {
	return (
		<div className={`size-20 ${styles}`}>
			<CircleLoader size={80} color={'#a855f7'}/>
		</div>
	);
};

export default Loader;
export default function Loading() {
	return (
		<div className="flex items-center justify-center h-screen">
			<svg className="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
				<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 014.708 4.708L2.293 7.121l2.121 2.122 2.121-2.122-1.415-1.414A6 6 0 1010 18.291V20h2v-1.709z"></path>
			</svg>
		</div>
	);
}
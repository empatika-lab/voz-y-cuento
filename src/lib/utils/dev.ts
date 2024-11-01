// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prettyPrint = (input: any) => {
	try {
		const jsonString = JSON.stringify(input, null, 4);
		// eslint-disable-next-line no-console
		console.log(jsonString);
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error('Error occurred while pretty printing server error:', e);
	}
};

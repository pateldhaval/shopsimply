export const actionCreator = (type: string, payload: any = null) => {
	return { type: type, payload: payload };
};

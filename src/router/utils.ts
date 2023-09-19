/** 判断是否是有效的 URL */
const isUrl = (url) => {
	try {
		new URL(url);
		return true;
	} catch (error) {
		return false;
	}
};

/** 静态路由按照 meta.rank 排序 */
const ascending = (arr: any[]) => {
	return arr.sort((a, b) => a.meta.rank - b.meta.rank);
};

export { isUrl, ascending };

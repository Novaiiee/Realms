export default function shortenString(str: string | undefined, length: number) {
	if (str?.length! < length) return str;
	return `${str?.substring(0, length).trim()}...`;
}

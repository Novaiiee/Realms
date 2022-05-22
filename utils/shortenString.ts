export default function shortenString(str: string | undefined, length: number) {
	return `${str?.substring(0, length).trim()}...`;
}

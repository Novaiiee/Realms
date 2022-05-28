const months = new Map<string, string>([
	["01", "January"],
	["02", "February"],
	["03", "March"],
	["04", "April"],
	["05", "May"],
	["06", "June"],
	["07", "July"],
	["08", "August"],
	["09", "September"],
	["10", "October"],
	["11", "November"],
	["12", "December"],
]);

export default function formatDate(date: string) {
	const toConvert = date.substring(0, 10);
	const [year, month, day] = toConvert.split("-");

	const monthAsString = months.get(month);
	return `${monthAsString} ${day}, ${year}`;
}

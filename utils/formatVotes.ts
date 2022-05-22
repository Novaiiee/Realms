export default function formatVotes(count: number) {
	if (count < 1e3) return count;
	if (count >= 1e3 && count < 1e6) return `${+(count / 1e3).toFixed(1)}K`;
	if (count >= 1e6 && count < 1e9) return `${+(count / 1e6).toFixed(1)}M`;
	if (count >= 1e9 && count < 1e12) return `${+(count / 1e9).toFixed(1)}B`;
	if (count >= 1e12) return `${+(count / 1e12).toFixed(1)}T`;

	return count;
}

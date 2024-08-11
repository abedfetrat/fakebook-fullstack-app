export const getDaysAgo = (timestamp: string) => {
  const difference = Date.now() - Date.parse(timestamp);
  const daysAgo = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (daysAgo === 0) {
    return "Today";
  } else if (daysAgo === 1) {
    return "Yesterday";
  } else {
    return `${daysAgo} days ago`;
  }
};
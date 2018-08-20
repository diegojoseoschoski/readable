export function timestampToDate(timestamp) {
  const date = new Date(timestamp);
  return date.toDateString();
}

export function getCategoryColor(category) {
  switch (category) {
    case "react":
      return "danger";
    case "redux":
      return "success";
    case "udacity":
      return "warning";
    default:
      return "primary";
  }
}

export function capitalize(str = "") {
  return typeof str !== "string" ? "" : str[0].toUpperCase() + str.slice(1);
}

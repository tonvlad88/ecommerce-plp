export default function capitalizeFirstLetter(string: string) {
  if (string.length === 0) {
    return ""; // Handle empty strings
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

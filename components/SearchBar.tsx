type Props = {
  debouncedQuery: string;
  setDebouncedQuery: (val: string) => void;
};
export default function SearchBar({
  debouncedQuery,
  setDebouncedQuery,
}: Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor="search" className="text-sm font-medium mb-1">
        Search Products
      </label>
      <input
        id="search"
        type="text"
        value={debouncedQuery}
        onChange={(e) => setDebouncedQuery(e.target.value)}
        placeholder="Search products here..."
        className="border p-2 rounded"
      />
    </div>
  );
}

type Props = {
  sortBy: string;
  setSortBy: (sort: string) => void;
  sortOptions: string[];
};
export default function SortProducts({
  sortBy,
  setSortBy,
  sortOptions,
}: Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor="sort" className="text-sm font-medium mb-1">
        Sort by Price
      </label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as "asc" | "desc")}
        className="border p-2 rounded"
      >
        {sortOptions.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

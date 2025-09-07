import React from "react";

type SortProductsProps<T extends string> = {
  sortBy: T;
  setSortBy: React.Dispatch<React.SetStateAction<T>>;
  sortOptions: readonly T[];
};

export default function SortProducts<T extends string>({
  sortBy,
  setSortBy,
  sortOptions,
}: SortProductsProps<T>) {
  return (
    <div className="flex flex-col">
      <label htmlFor="sort" className="text-sm font-medium mb-1">
        Sort by Price
      </label>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as T)}
        className="border p-2 rounded"
      >
        {sortOptions.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

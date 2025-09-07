import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

type Props = {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  categories: string[];
};
export default function FilterProducts({
  selectedCategory,
  setSelectedCategory,
  categories,
}: Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor="category" className="text-sm font-medium mb-1">
        Filter by Category
      </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border p-2 rounded"
      >
        {categories.map((cat) => (
          <option key={cat}>{capitalizeFirstLetter(cat)}</option>
        ))}
      </select>
    </div>
  );
}

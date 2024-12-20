interface FilterChipsProps {
  filters: Record<string, string>;
  onRemove: (key: string) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ filters, onRemove }) => {
  return (
    <div className="flex gap-2">
      {Object.entries(filters).map(([key, value]) => (
        value && (
          <button
            key={key}
            className="flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-full"
            onClick={() => onRemove(key)}
          >
            {value}
            <span className="ml-2 text-blue-300 hover:text-blue-400">✕</span>
          </button>
        )
      ))}
    </div>
  );
};

export default FilterChips;

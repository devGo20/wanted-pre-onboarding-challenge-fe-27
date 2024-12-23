import { Priority } from '../model/todo';
interface PriorityButtonsProps {
  selectedPriority: string,
  onSelect: (priority: string) => void;

}
export const PriorityButtons: React.FC<PriorityButtonsProps> = ({ selectedPriority, onSelect }) => {
  return (
    <div className="flex">
      {Object.values(Priority).map((item) => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          className={`px-4 py-2 rounded ${selectedPriority === item
            ? 'bg-black text-white'
            : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

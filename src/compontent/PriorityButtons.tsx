import { Priority } from '../model/todo';
interface PriorityButtonsProps {
  selectedPriority: string,
  onSelect: (priority: string) => void;

}
export const PriorityButtons: React.FC<PriorityButtonsProps> = ({ selectedPriority, onSelect }) => {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {Object.values(Priority).map((item) => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          style={{
            border: 'none',
            borderBottom: selectedPriority === item ? '2px solid black' : '2px solid transparent',
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

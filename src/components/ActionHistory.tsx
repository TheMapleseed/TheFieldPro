
import { Clock, FileEdit, FilePlus, FileX, FileType } from 'lucide-react';
import { Action } from '@/pages/Index';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ActionHistoryProps {
  actions: Action[];
  currentIndex: number;
  onSelectAction: (index: number) => void;
}

export const ActionHistory = ({ actions, currentIndex, onSelectAction }: ActionHistoryProps) => {
  const getActionIcon = (type: Action['type']) => {
    switch (type) {
      case 'create':
        return <FilePlus className="w-4 h-4 text-green-400" />;
      case 'modify':
        return <FileEdit className="w-4 h-4 text-blue-400" />;
      case 'delete':
        return <FileX className="w-4 h-4 text-red-400" />;
      case 'rename':
        return <FileType className="w-4 h-4 text-yellow-400" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-80 border-l border-slate-700/50 bg-slate-800/20 flex flex-col">
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-slate-400" />
          <h3 className="text-lg font-semibold text-white">History</h3>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          {actions.length} actions • Position {currentIndex + 1}
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {actions.map((action, index) => (
            <Card
              key={action.id}
              className={`p-3 cursor-pointer transition-all duration-200 border ${
                index === currentIndex
                  ? 'bg-blue-500/10 border-blue-500/30 shadow-lg shadow-blue-500/10'
                  : index < currentIndex
                  ? 'bg-slate-700/20 border-slate-600/30 opacity-60'
                  : 'bg-slate-800/30 border-slate-700/50 opacity-40'
              } hover:opacity-100`}
              onClick={() => onSelectAction(index)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getActionIcon(action.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium truncate ${
                      index <= currentIndex ? 'text-white' : 'text-slate-400'
                    }`}>
                      {action.description}
                    </p>
                    <span className="text-xs text-slate-500 ml-2 flex-shrink-0">
                      {formatTime(action.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-xs text-slate-400 mt-1 truncate">
                    {action.target}
                  </p>
                  
                  <div className="flex items-center mt-2">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      index < currentIndex 
                        ? 'bg-green-400' 
                        : index === currentIndex 
                        ? 'bg-blue-400' 
                        : 'bg-slate-600'
                    }`} />
                    <span className="text-xs text-slate-500 capitalize">
                      {action.type}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

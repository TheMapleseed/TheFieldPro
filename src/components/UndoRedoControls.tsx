
import { Undo2, Redo2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UndoRedoControlsProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export const UndoRedoControls = ({ canUndo, canRedo, onUndo, onRedo }: UndoRedoControlsProps) => {
  return (
    <div className="flex items-center space-x-1">
      <Button
        size="sm"
        variant="outline"
        disabled={!canUndo}
        onClick={onUndo}
        className="border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-30"
      >
        <Undo2 className="w-4 h-4 mr-1" />
        Undo
      </Button>
      
      <Button
        size="sm"
        variant="outline"
        disabled={!canRedo}
        onClick={onRedo}
        className="border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-30"
      >
        <Redo2 className="w-4 h-4 mr-1" />
        Redo
      </Button>
    </div>
  );
};

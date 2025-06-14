
import { useState } from 'react';
import { Save, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface FileEditorProps {
  fileId: string;
  onSave: (content: string) => void;
}

export const FileEditor = ({ fileId, onSave }: FileEditorProps) => {
  const [content, setContent] = useState(`// Welcome to The Field Editor
// This is a demo file for fileId: ${fileId}

export const MyComponent = () => {
  return (
    <div className="p-4">
      <h1>Hello from The Field!</h1>
      <p>This is a sample React component.</p>
    </div>
  );
};

export default MyComponent;
`);

  const [isDirty, setIsDirty] = useState(false);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setIsDirty(true);
  };

  const handleSave = () => {
    onSave(content);
    setIsDirty(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-slate-800/30">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-slate-400">Editing file</span>
          {isDirty && (
            <span className="text-xs text-orange-400 bg-orange-400/20 px-2 py-1 rounded">
              Unsaved changes
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            size="sm" 
            variant="outline"
            className="border-green-600 text-green-400 hover:bg-green-600/20"
            onClick={handleSave}
            disabled={!isDirty}
          >
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className="border-blue-600 text-blue-400 hover:bg-blue-600/20"
          >
            <Play className="w-4 h-4 mr-1" />
            Run
          </Button>
        </div>
      </div>

      <div className="flex-1 p-0">
        <Textarea
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          className="w-full h-full resize-none border-0 bg-slate-900/50 text-slate-100 font-mono text-sm leading-relaxed focus:ring-0 focus:outline-none rounded-none"
          placeholder="Start coding..."
        />
      </div>
    </div>
  );
};

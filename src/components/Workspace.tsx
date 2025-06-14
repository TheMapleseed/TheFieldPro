
import { useState } from 'react';
import { FileTree } from '@/components/FileTree';
import { FileEditor } from '@/components/FileEditor';
import { Repository, Action } from '@/pages/Index';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface WorkspaceProps {
  repository: Repository;
  onAction: (action: Omit<Action, 'id' | 'timestamp'>) => void;
}

export const Workspace = ({ repository, onAction }: WorkspaceProps) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleFileSelect = (fileId: string, fileName: string) => {
    setSelectedFile(fileId);
    onAction({
      type: 'modify',
      target: fileName,
      description: `Opened ${fileName}`
    });
  };

  return (
    <div className="flex-1 flex">
      <div className="w-80 border-r border-slate-700/50 bg-slate-800/20">
        <div className="p-4 border-b border-slate-700/50">
          <h3 className="text-lg font-semibold text-white">Explorer</h3>
        </div>
        <div className="p-2">
          <FileTree 
            files={repository.files}
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedFile ? (
          <Tabs defaultValue="editor" className="flex-1 flex flex-col">
            <div className="border-b border-slate-700/50 bg-slate-800/30 px-4">
              <TabsList className="bg-transparent border-0 h-12">
                <TabsTrigger value="editor" className="data-[state=active]:bg-slate-700/50 text-slate-300">
                  Editor
                </TabsTrigger>
                <TabsTrigger value="preview" className="data-[state=active]:bg-slate-700/50 text-slate-300">
                  Preview
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="editor" className="flex-1 m-0">
              <FileEditor 
                fileId={selectedFile}
                onSave={(content) => onAction({
                  type: 'modify',
                  target: 'current file',
                  description: 'Saved file changes'
                })}
              />
            </TabsContent>
            
            <TabsContent value="preview" className="flex-1 m-0 p-6">
              <Card className="h-full bg-slate-800/30 border-slate-700/50 flex items-center justify-center">
                <p className="text-slate-400">Preview will be shown here</p>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Card className="p-8 bg-slate-800/30 border-slate-700/50 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Welcome to The Field</h3>
              <p className="text-slate-400">Select a file from the explorer to start editing</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};


import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Workspace } from '@/components/Workspace';
import { ActionHistory } from '@/components/ActionHistory';
import { UndoRedoControls } from '@/components/UndoRedoControls';
import { SidebarProvider } from '@/components/ui/sidebar';

export interface Repository {
  id: string;
  name: string;
  files: FileNode[];
  currentBranch: string;
  lastModified: Date;
}

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
  modified: boolean;
}

export interface Action {
  id: string;
  type: 'create' | 'modify' | 'delete' | 'rename';
  target: string;
  timestamp: Date;
  description: string;
}

const Index = () => {
  const [repositories] = useState<Repository[]>([
    {
      id: '1',
      name: 'my-awesome-app',
      currentBranch: 'main',
      lastModified: new Date(),
      files: [
        {
          id: '1',
          name: 'src',
          type: 'folder',
          modified: false,
          children: [
            { id: '2', name: 'components', type: 'folder', modified: false, children: [] },
            { id: '3', name: 'pages', type: 'folder', modified: true, children: [] },
            { id: '4', name: 'utils', type: 'folder', modified: false, children: [] },
          ]
        },
        { id: '5', name: 'package.json', type: 'file', modified: false },
        { id: '6', name: 'README.md', type: 'file', modified: true },
      ]
    },
    {
      id: '2',
      name: 'design-system',
      currentBranch: 'main',
      lastModified: new Date(Date.now() - 86400000),
      files: [
        {
          id: '7',
          name: 'components',
          type: 'folder',
          modified: false,
          children: []
        },
        { id: '8', name: 'package.json', type: 'file', modified: false },
      ]
    }
  ]);

  const [currentRepo, setCurrentRepo] = useState<Repository>(repositories[0]);
  const [actionHistory, setActionHistory] = useState<Action[]>([
    {
      id: '1',
      type: 'modify',
      target: 'README.md',
      timestamp: new Date(Date.now() - 300000),
      description: 'Updated project documentation'
    },
    {
      id: '2',
      type: 'create',
      target: 'src/pages/Dashboard.tsx',
      timestamp: new Date(Date.now() - 600000),
      description: 'Added dashboard component'
    },
    {
      id: '3',
      type: 'modify',
      target: 'src/components/Header.tsx',
      timestamp: new Date(Date.now() - 900000),
      description: 'Fixed navigation styling'
    }
  ]);

  const [historyIndex, setHistoryIndex] = useState(actionHistory.length - 1);

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      console.log('Undo action:', actionHistory[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < actionHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      console.log('Redo action:', actionHistory[historyIndex + 1]);
    }
  };

  const handleNewAction = (action: Omit<Action, 'id' | 'timestamp'>) => {
    const newAction: Action = {
      ...action,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    
    const newHistory = [...actionHistory.slice(0, historyIndex + 1), newAction];
    setActionHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Sidebar 
          repositories={repositories} 
          currentRepo={currentRepo}
          onRepoSelect={setCurrentRepo}
        />
        
        <main className="flex-1 flex flex-col">
          <div className="border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-white">The Field</h1>
                <div className="text-slate-400">
                  <span className="text-slate-500">/</span>
                  <span className="ml-1">{currentRepo.name}</span>
                </div>
              </div>
              
              <UndoRedoControls
                canUndo={historyIndex > 0}
                canRedo={historyIndex < actionHistory.length - 1}
                onUndo={handleUndo}
                onRedo={handleRedo}
              />
            </div>
          </div>

          <div className="flex-1 flex">
            <Workspace 
              repository={currentRepo}
              onAction={handleNewAction}
            />
            
            <ActionHistory 
              actions={actionHistory}
              currentIndex={historyIndex}
              onSelectAction={setHistoryIndex}
            />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;

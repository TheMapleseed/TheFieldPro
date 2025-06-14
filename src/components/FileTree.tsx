
import { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from 'lucide-react';
import { FileNode } from '@/pages/Index';
import { Button } from '@/components/ui/button';

interface FileTreeProps {
  files: FileNode[];
  onFileSelect: (fileId: string, fileName: string) => void;
  selectedFile: string | null;
  level?: number;
}

export const FileTree = ({ files, onFileSelect, selectedFile, level = 0 }: FileTreeProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['1']));

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  return (
    <div className="space-y-1">
      {files.map((file) => (
        <div key={file.id}>
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start h-8 px-2 text-left font-normal ${
              selectedFile === file.id 
                ? 'bg-blue-500/20 text-blue-100 hover:bg-blue-500/30' 
                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
            }`}
            style={{ paddingLeft: `${8 + level * 16}px` }}
            onClick={() => {
              if (file.type === 'folder') {
                toggleFolder(file.id);
              } else {
                onFileSelect(file.id, file.name);
              }
            }}
          >
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              {file.type === 'folder' ? (
                <>
                  {expandedFolders.has(file.id) ? (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                  {expandedFolders.has(file.id) ? (
                    <FolderOpen className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  ) : (
                    <Folder className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  )}
                </>
              ) : (
                <>
                  <div className="w-4 h-4 flex-shrink-0" />
                  <File className="w-4 h-4 text-slate-400 flex-shrink-0" />
                </>
              )}
              
              <span className="truncate flex-1">
                {file.name}
                {file.modified && (
                  <span className="ml-1 text-orange-400 text-xs">●</span>
                )}
              </span>
            </div>
          </Button>

          {file.type === 'folder' && 
           file.children && 
           expandedFolders.has(file.id) && (
            <FileTree
              files={file.children}
              onFileSelect={onFileSelect}
              selectedFile={selectedFile}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
};

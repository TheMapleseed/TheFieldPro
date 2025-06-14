
import { FolderGit2, Settings, Plus } from 'lucide-react';
import { Repository } from '@/pages/Index';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SidebarProps {
  repositories: Repository[];
  currentRepo: Repository;
  onRepoSelect: (repo: Repository) => void;
}

export const Sidebar = ({ repositories, currentRepo, onRepoSelect }: SidebarProps) => {
  return (
    <div className="w-80 bg-slate-900/50 backdrop-blur-sm border-r border-slate-700/50 flex flex-col">
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Repositories</h2>
          <Button size="sm" variant="outline" className="border-slate-600 hover:bg-slate-700">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {repositories.map((repo) => (
          <Card 
            key={repo.id}
            className={`p-4 cursor-pointer transition-all duration-200 border ${
              currentRepo.id === repo.id 
                ? 'bg-blue-500/10 border-blue-500/30 shadow-lg shadow-blue-500/10' 
                : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-700/30 hover:border-slate-600/50'
            }`}
            onClick={() => onRepoSelect(repo)}
          >
            <div className="flex items-start space-x-3">
              <FolderGit2 className={`w-5 h-5 mt-0.5 ${
                currentRepo.id === repo.id ? 'text-blue-400' : 'text-slate-400'
              }`} />
              <div className="flex-1 min-w-0">
                <h3 className={`font-medium truncate ${
                  currentRepo.id === repo.id ? 'text-blue-100' : 'text-white'
                }`}>
                  {repo.name}
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Branch: {repo.currentBranch}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {repo.lastModified.toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="p-4 border-t border-slate-700/50">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-700/50"
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  );
};

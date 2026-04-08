import React from 'react';
import { FileText, Image, ExternalLink, Shield } from './Icons';
import { mockDocuments } from '../data/mockData';

const getDocIcon = (type: string) => {
  switch (type) {
    case 'image': return <Image className="w-5 h-5 text-purple-400" />;
    case 'contract': return <Shield className="w-5 h-5 text-green-400" />;
    default: return <FileText className="w-5 h-5 text-blue-400" />;
  }
};

const getDocBg = (type: string) => {
  switch (type) {
    case 'image': return 'bg-purple-500/20';
    case 'contract': return 'bg-green-500/20';
    default: return 'bg-blue-500/20';
  }
};

const DocumentList: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <h3 className="text-lg font-bold">Documents</h3>
        <p className="text-gray-500 text-xs">Project files and photos</p>
      </div>

      <div className="space-y-2">
        {mockDocuments.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 bg-brand-card border border-white/10 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getDocBg(doc.type)}`}>
                {getDocIcon(doc.type)}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{doc.name}</p>
                <p className="text-xs text-gray-500">{doc.size} · {doc.date}</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-amber-400 transition-colors" />
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-[10px] text-gray-600">Demo mode — files are simulated</p>
      </div>
    </div>
  );
};

export default DocumentList;

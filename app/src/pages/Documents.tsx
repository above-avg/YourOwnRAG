import React from 'react';
import { DocumentManager } from '@/components/DocumentManager';

const Documents: React.FC = () => {
  return (
    <div className="h-full p-4 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Document Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Upload and manage your documents for the AI assistant to reference.
          </p>
        </div>
        
        <DocumentManager />
      </div>
    </div>
  );
};

export default Documents;
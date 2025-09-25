import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Upload, 
  FileText, 
  Trash2, 
  Search, 
  Download,
  File,
  X,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Document {
  file_id: string;
  filename: string;
  upload_timestamp?: string;
}

interface DocumentManagerProps {
  onDocumentChange?: () => void;
}

export const DocumentManager: React.FC<DocumentManagerProps> = ({ onDocumentChange }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      const { apiService } = await import('@/lib/api');
      const docs = await apiService.listDocuments();
      setDocuments(docs);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load documents",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const filteredDocuments = documents.filter(doc =>
    doc.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    uploadFiles(files);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    uploadFiles(files);
  };

  const uploadFiles = async (files: File[]) => {
    const allowedTypes = ['.pdf', '.docx', '.html'];
    
    for (const file of files) {
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (!allowedTypes.includes(fileExtension)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not supported. Use PDF, DOCX, or HTML files.`,
          variant: "destructive",
        });
        continue;
      }

      setUploadingFiles(prev => new Set([...prev, file.name]));

      try {
        const { apiService } = await import('@/lib/api');
        const result = await apiService.uploadDocument(file);
        
        toast({
          title: "Success",
          description: `${file.name} uploaded successfully`,
        });
        fetchDocuments();
        onDocumentChange?.();
      } catch (error) {
        toast({
          title: "Upload failed",
          description: `Failed to upload ${file.name}`,
          variant: "destructive",
        });
      } finally {
        setUploadingFiles(prev => {
          const newSet = new Set(prev);
          newSet.delete(file.name);
          return newSet;
        });
      }
    }
  };

  const deleteDocument = async (docId: string, filename: string) => {
    try {
      const { apiService } = await import('@/lib/api');
      const result = await apiService.deleteDocument(docId);
      
      toast({
        title: "Deleted",
        description: `${filename} has been deleted`,
      });
      fetchDocuments();
      onDocumentChange?.();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to delete ${filename}`,
        variant: "destructive",
      });
    }
  };

  const getFileIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FileText className="w-8 h-8 text-red-500" />;
      case 'docx':
        return <File className="w-8 h-8 text-blue-500" />;
      case 'html':
        return <File className="w-8 h-8 text-orange-500" />;
      default:
        return <File className="w-8 h-8 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300",
              isDragOver 
                ? "border-primary bg-primary/10" 
                : "border-border hover:border-primary/50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-medium mb-2">
              Drag & drop files here, or{' '}
              <label className="text-primary cursor-pointer hover:underline">
                browse
                <input
                  type="file"
                  multiple
                  accept=".pdf,.docx,.html"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </h3>
            <p className="text-sm text-muted-foreground">
              Supports PDF, DOCX, and HTML files
            </p>
          </div>

          {/* Uploading Files */}
          {uploadingFiles.size > 0 && (
            <div className="mt-4 space-y-2">
              {Array.from(uploadingFiles).map(filename => (
                <div key={filename} className="flex items-center gap-2 p-2 bg-muted rounded">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Uploading {filename}...</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Document Library
              <Badge variant="secondary" className="ml-2">
                {documents.length}
              </Badge>
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="ml-2">Loading documents...</span>
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? 'No documents match your search.' : 'No documents uploaded yet.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((doc, index) => (
                <Card 
                  key={doc.file_id} 
                  className="hover:border-primary/50 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {getFileIcon(doc.filename)}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate" title={doc.filename}>
                          {doc.filename}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {doc.upload_timestamp ? new Date(doc.upload_timestamp).toLocaleDateString() : 'Recently uploaded'}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteDocument(doc.file_id, doc.filename)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
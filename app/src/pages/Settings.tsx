import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon, 
  Database, 
  Cpu, 
  Palette, 
  Save,
  RotateCcw,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSettings } from '@/contexts/SettingsContext';

const Settings: React.FC = () => {
  const { toast } = useToast();
  const { settings, updateSetting, resetSettings } = useSettings();
  const [hasChanges, setHasChanges] = useState(false);

  // Update settings and mark as changed
  const handleUpdateSetting = <K extends keyof typeof settings>(key: K, value: typeof settings[K]) => {
    updateSetting(key, value);
    setHasChanges(true);
  };

  const handleSave = () => {
    setHasChanges(false);
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleReset = () => {
    resetSettings();
    setHasChanges(true);
    toast({
      title: "Settings reset",
      description: "All settings have been restored to defaults.",
    });
  };

  const clearChatHistory = () => {
    localStorage.removeItem('rag-session-id');
    toast({
      title: "Chat history cleared",
      description: "Your chat session has been reset.",
    });
  };

  const deleteAllDocuments = async () => {
    try {
      const { apiService } = await import('@/lib/api');
      const documents = await apiService.listDocuments();
      
      // Delete all documents
      for (const doc of documents) {
        await apiService.deleteDocument(doc.file_id);
      }
      
      toast({
        title: "All documents deleted",
        description: `${documents.length} documents have been removed.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete all documents.",
        variant: "destructive",
      });
    }
  };

  const resetAllSettings = () => {
    localStorage.removeItem('rag-session-id');
    resetSettings();
    setHasChanges(false);
    toast({
      title: "All settings reset",
      description: "Application has been restored to default state.",
    });
  };

  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Configure your RAG AI Assistant preferences and system settings.
          </p>
        </div>

        {/* AI Model Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-5 h-5" />
              AI Model Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Default Model</Label>
                <Select value={settings.defaultModel} onValueChange={(value) => handleUpdateSetting('defaultModel', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gemini-2.5-flash-lite">
                      <div className="flex items-center gap-2">
                        Gemini 2.5 Flash Lite
                        <Badge variant="secondary">Fast</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="gemini-2.5-flash">
                      <div className="flex items-center gap-2">
                        Gemini 2.5 Flash
                        <Badge variant="secondary">Accurate</Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Response Temperature</Label>
                <Select value={settings.responseTemperature} onValueChange={(value) => handleUpdateSetting('responseTemperature', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.3">Conservative (0.3)</SelectItem>
                    <SelectItem value="0.7">Balanced (0.7)</SelectItem>
                    <SelectItem value="1.0">Creative (1.0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Max Response Length</Label>
              <Input 
                type="number" 
                value={settings.maxResponseLength} 
                onChange={(e) => handleUpdateSetting('maxResponseLength', parseInt(e.target.value) || 2048)}
                placeholder="2048" 
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Stream Responses</Label>
                <p className="text-sm text-muted-foreground">
                  Show responses as they're generated
                </p>
              </div>
              <Switch 
                checked={settings.streamResponses} 
                onCheckedChange={(checked) => handleUpdateSetting('streamResponses', checked)} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Document Processing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Document Processing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Chunk Size</Label>
                <Input 
                  type="number" 
                  value={settings.chunkSize} 
                  onChange={(e) => handleUpdateSetting('chunkSize', parseInt(e.target.value) || 1000)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Chunk Overlap</Label>
                <Input 
                  type="number" 
                  value={settings.chunkOverlap} 
                  onChange={(e) => handleUpdateSetting('chunkOverlap', parseInt(e.target.value) || 200)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Max Documents Retrieved</Label>
              <Select value={settings.maxDocumentsRetrieved} onValueChange={(value) => handleUpdateSetting('maxDocumentsRetrieved', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 document</SelectItem>
                  <SelectItem value="2">2 documents</SelectItem>
                  <SelectItem value="3">3 documents</SelectItem>
                  <SelectItem value="5">5 documents</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-index Documents</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically process uploaded files
                </p>
              </div>
              <Switch 
                checked={settings.autoIndexDocuments} 
                onCheckedChange={(checked) => handleUpdateSetting('autoIndexDocuments', checked)} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Interface Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Interface
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Animations</Label>
                <p className="text-sm text-muted-foreground">
                  Enable smooth transitions and effects
                </p>
              </div>
              <Switch 
                checked={settings.animations} 
                onCheckedChange={(checked) => handleUpdateSetting('animations', checked)} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Sound Effects</Label>
                <p className="text-sm text-muted-foreground">
                  Play sounds for notifications and actions
                </p>
              </div>
              <Switch 
                checked={settings.soundEffects} 
                onCheckedChange={(checked) => handleUpdateSetting('soundEffects', checked)} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Compact Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Use smaller UI elements to fit more content
                </p>
              </div>
              <Switch 
                checked={settings.compactMode} 
                onCheckedChange={(checked) => handleUpdateSetting('compactMode', checked)} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Clear Chat History</h4>
              <p className="text-sm text-muted-foreground">
                Remove all chat messages and reset your session.
              </p>
              <Button 
                variant="outline" 
                onClick={clearChatHistory}
                className="w-fit"
              >
                Clear History
              </Button>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium text-destructive">Danger Zone</h4>
              <p className="text-sm text-muted-foreground">
                These actions cannot be undone.
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="destructive" 
                  className="w-fit"
                  onClick={deleteAllDocuments}
                >
                  Delete All Documents
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-fit"
                  onClick={resetAllSettings}
                >
                  Reset All Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
          
          <Button 
            onClick={handleSave} 
            className="bg-primary hover:bg-primary/90"
            disabled={!hasChanges}
          >
            <Save className="w-4 h-4 mr-2" />
            {hasChanges ? 'Save Settings' : 'Settings Saved'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
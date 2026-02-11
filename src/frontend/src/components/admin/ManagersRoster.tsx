import { useState } from 'react';
import { useGetAllManagers, useAddManager, useRemoveManager } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Plus, Trash2, User } from 'lucide-react';

export default function ManagersRoster() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    contactInfo: ''
  });

  const { data: managers, isLoading } = useGetAllManagers();
  const addMutation = useAddManager();
  const removeMutation = useRemoveManager();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Manager name is required');
      return;
    }

    try {
      await addMutation.mutateAsync({
        name: formData.name,
        bio: formData.bio || null,
        contactInfo: formData.contactInfo || null
      });
      setFormData({ name: '', bio: '', contactInfo: '' });
      setIsDialogOpen(false);
    } catch (error: any) {
      alert(error.message || 'Failed to add manager');
    }
  };

  const handleRemove = async (managerId: bigint) => {
    if (!confirm('Are you sure you want to remove this manager?')) return;
    
    try {
      await removeMutation.mutateAsync(managerId);
    } catch (error: any) {
      alert(error.message || 'Failed to remove manager');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-bold gold-text">
          Managers Roster
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gold-gradient text-black">
              <Plus className="w-4 h-4 mr-2" />
              Add Manager
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="gold-text">Add New Manager</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="manager-name">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="manager-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Manager name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manager-bio">Bio (Optional)</Label>
                <Textarea
                  id="manager-bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Brief bio or description"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manager-contact">Contact Info (Optional)</Label>
                <Input
                  id="manager-contact"
                  value={formData.contactInfo}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactInfo: e.target.value }))}
                  placeholder="Email or phone"
                />
              </div>
              <Button
                type="submit"
                className="w-full gold-gradient text-black"
                disabled={addMutation.isPending}
              >
                {addMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Manager'
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {managers && managers.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No managers added yet
          </div>
        ) : (
          managers?.map((manager) => (
            <Card key={manager.id.toString()} className="relative">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gold">
                  <User className="w-5 h-5" />
                  {manager.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {manager.bio && (
                  <p className="text-sm text-muted-foreground">{manager.bio}</p>
                )}
                {manager.contactInfo && (
                  <p className="text-sm text-foreground">{manager.contactInfo}</p>
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemove(manager.id)}
                  disabled={removeMutation.isPending}
                  className="w-full mt-4"
                >
                  {removeMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

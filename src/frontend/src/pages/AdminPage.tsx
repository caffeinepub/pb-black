import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserRole } from '../hooks/useQueries';
import LoginButton from '../components/auth/LoginButton';
import InviteRequestsTable from '../components/admin/InviteRequestsTable';
import ManagersRoster from '../components/admin/ManagersRoster';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield } from 'lucide-react';

export default function AdminPage() {
  const { identity } = useInternetIdentity();
  const { data: userRole, isLoading: roleLoading } = useGetCallerUserRole();

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const isAuthenticated = !!identity;
  const isAdmin = userRole === 'admin';

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <Shield className="w-16 h-16 text-gold mx-auto mb-4" />
            <h1 className="text-2xl font-serif font-bold mb-4 gold-text">
              PB Black Admin
            </h1>
            <p className="text-muted-foreground mb-6">
              Please sign in to access the admin panel.
            </p>
            <LoginButton />
            <button
              onClick={navigateToHome}
              className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-card border border-destructive rounded-lg p-8 text-center">
            <Shield className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-serif font-bold mb-4 text-destructive">
              Access Denied
            </h1>
            <p className="text-muted-foreground mb-6">
              You do not have permission to access the admin panel.
            </p>
            <div className="flex flex-col gap-3">
              <LoginButton />
              <button
                onClick={navigateToHome}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-gold" />
            <h1 className="text-xl font-serif font-bold gold-text">
              PB Black Admin
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={navigateToHome}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Home
            </button>
            <LoginButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="requests" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="requests">Invite Requests</TabsTrigger>
            <TabsTrigger value="managers">Managers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="requests">
            <InviteRequestsTable />
          </TabsContent>
          
          <TabsContent value="managers">
            <ManagersRoster />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

import { useState } from 'react';
import { useSubmitInviteRequest } from '../../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import PremiumButton from './PremiumButton';
import { validateEmail, validatePhone, validateLinkedIn } from '../../lib/validators';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function InviteRequestForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    source: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useSubmitInviteRequest();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailError = validateEmail(formData.email);
    if (emailError) {
      newErrors.email = emailError;
    }

    const phoneError = validatePhone(formData.phone);
    if (phoneError) {
      newErrors.phone = phoneError;
    }

    const linkedinError = validateLinkedIn(formData.linkedin);
    if (linkedinError) {
      newErrors.linkedin = linkedinError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    try {
      await submitMutation.mutateAsync(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        linkedin: '',
        source: ''
      });
    } catch (error) {
      console.error('Failed to submit invite request:', error);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-card border border-gold/50 rounded-lg p-8 text-center shadow-gold">
          <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-4" />
          <h3 className="text-2xl font-serif font-bold mb-3 gold-text">
            Invitation Request Received
          </h3>
          <p className="text-foreground mb-4">
            Thank you for your interest in PB Black. Our team will review your application and contact you soon.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            You can check your application status using the "Check Invitation Status" section below.
          </p>
          <PremiumButton onClick={() => setSubmitted(false)}>
            Submit Another Request
          </PremiumButton>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={errors.name ? 'border-destructive' : ''}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground">
            Phone <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className={errors.phone ? 'border-destructive' : ''}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin" className="text-foreground">
            LinkedIn Profile <span className="text-destructive">*</span>
          </Label>
          <Input
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/yourprofile or yourhandle"
            className={errors.linkedin ? 'border-destructive' : ''}
          />
          {errors.linkedin && (
            <p className="text-sm text-destructive">{errors.linkedin}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Enter your LinkedIn profile URL or handle
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="source" className="text-foreground">
            How did you hear about PB Black? (Optional)
          </Label>
          <Textarea
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            placeholder="Referral, search, social media, etc."
            rows={3}
          />
        </div>

        <PremiumButton
          type="submit"
          className="w-full"
          disabled={submitMutation.isPending}
        >
          {submitMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Invitation Request'
          )}
        </PremiumButton>
      </form>
    </div>
  );
}

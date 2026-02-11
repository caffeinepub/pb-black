import { useState } from 'react';
import { useSubmitQualification } from '../../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PremiumButton from './PremiumButton';
import { validateEmail, validatePhone, validateLinkedIn, validateHealthCover } from '../../lib/validators';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { PremiumIncomeRange, Occupation, PreferredCallTime } from '../../backend';

export default function PremiumQualificationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    referredBy: '',
    totalHealthCover: '',
    annualPremiumRange: '' as PremiumIncomeRange | '',
    occupation: '' as Occupation | '',
    preferredCallTime: '' as PreferredCallTime | ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useSubmitQualification();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
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

    if (formData.totalHealthCover) {
      const healthCoverError = validateHealthCover(formData.totalHealthCover);
      if (healthCoverError) {
        newErrors.totalHealthCover = healthCoverError;
      }
    }

    if (!formData.annualPremiumRange) {
      newErrors.annualPremiumRange = 'Please select your annual premium range';
    }

    if (!formData.occupation) {
      newErrors.occupation = 'Please select your occupation';
    }

    if (!formData.preferredCallTime) {
      newErrors.preferredCallTime = 'Please select your preferred call time';
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
      await submitMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        linkedin: formData.linkedin,
        referredBy: formData.referredBy || null,
        totalHealthCover: formData.totalHealthCover ? BigInt(formData.totalHealthCover) : null,
        annualPremiumRange: formData.annualPremiumRange as PremiumIncomeRange,
        occupation: formData.occupation as Occupation,
        preferredCallTime: formData.preferredCallTime as PreferredCallTime
      });
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        linkedin: '',
        referredBy: '',
        totalHealthCover: '',
        annualPremiumRange: '',
        occupation: '',
        preferredCallTime: ''
      });
    } catch (error) {
      console.error('Failed to submit qualification:', error);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-card border border-gold/50 rounded-lg p-10 text-center shadow-gold">
          <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-6" />
          <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 gold-text">
            Application Received
          </h3>
          <p className="text-foreground mb-4 text-lg">
            Thank you for your interest in PB Black.
          </p>
          <p className="text-muted-foreground mb-6">
            Our team will review your application and reach out within 48 hours.
          </p>
          <PremiumButton onClick={() => setSubmitted(false)}>
            Submit Another Application
          </PremiumButton>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-card border border-border/50 rounded-lg p-8 md:p-10 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-medium">
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
            <Label htmlFor="phone" className="text-foreground font-medium">
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground font-medium">
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
          <Label htmlFor="linkedin" className="text-foreground font-medium">
            LinkedIn Profile <span className="text-destructive">*</span>
          </Label>
          <Input
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/yourprofile"
            className={errors.linkedin ? 'border-destructive' : ''}
          />
          {errors.linkedin && (
            <p className="text-sm text-destructive">{errors.linkedin}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="totalHealthCover" className="text-foreground font-medium">
              Total Health Cover (₹)
            </Label>
            <Input
              id="totalHealthCover"
              name="totalHealthCover"
              type="number"
              value={formData.totalHealthCover}
              onChange={handleChange}
              placeholder="e.g., 5000000"
              className={errors.totalHealthCover ? 'border-destructive' : ''}
            />
            {errors.totalHealthCover && (
              <p className="text-sm text-destructive">{errors.totalHealthCover}</p>
            )}
            <p className="text-xs text-muted-foreground">Optional: Enter amount in rupees</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="annualPremiumRange" className="text-foreground font-medium">
              Annual Premium Range <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.annualPremiumRange}
              onValueChange={(value) => handleSelectChange('annualPremiumRange', value)}
            >
              <SelectTrigger className={errors.annualPremiumRange ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PremiumIncomeRange.range25kTo50k}>₹25,000 - ₹50,000</SelectItem>
                <SelectItem value={PremiumIncomeRange.range50kTo75k}>₹50,000 - ₹75,000</SelectItem>
                <SelectItem value={PremiumIncomeRange.range75kTo100k}>₹75,000 - ₹1,00,000</SelectItem>
                <SelectItem value={PremiumIncomeRange.range100kPlus}>₹1,00,000+</SelectItem>
              </SelectContent>
            </Select>
            {errors.annualPremiumRange && (
              <p className="text-sm text-destructive">{errors.annualPremiumRange}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="occupation" className="text-foreground font-medium">
            Occupation <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.occupation}
            onValueChange={(value) => handleSelectChange('occupation', value)}
          >
            <SelectTrigger className={errors.occupation ? 'border-destructive' : ''}>
              <SelectValue placeholder="Select occupation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Occupation.ceoOrExecutive}>CEO / Executive</SelectItem>
              <SelectItem value={Occupation.partnerOrDirector}>Partner / Director</SelectItem>
              <SelectItem value={Occupation.entrepreneurBusinessOwner}>Entrepreneur / Business Owner</SelectItem>
              <SelectItem value={Occupation.medicalProfessional}>Medical Professional</SelectItem>
              <SelectItem value={Occupation.lawProfessional}>Law Professional</SelectItem>
              <SelectItem value={Occupation.pilot}>Pilot</SelectItem>
              <SelectItem value={Occupation.corporateProfessional}>Corporate Professional</SelectItem>
              <SelectItem value={Occupation.notListed}>Not Listed</SelectItem>
            </SelectContent>
          </Select>
          {errors.occupation && (
            <p className="text-sm text-destructive">{errors.occupation}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredCallTime" className="text-foreground font-medium">
            Preferred Time to Connect <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.preferredCallTime}
            onValueChange={(value) => handleSelectChange('preferredCallTime', value)}
          >
            <SelectTrigger className={errors.preferredCallTime ? 'border-destructive' : ''}>
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={PreferredCallTime.morning}>Morning (9 AM - 12 PM)</SelectItem>
              <SelectItem value={PreferredCallTime.afternoon}>Afternoon (12 PM - 5 PM)</SelectItem>
              <SelectItem value={PreferredCallTime.evening}>Evening (5 PM - 8 PM)</SelectItem>
            </SelectContent>
          </Select>
          {errors.preferredCallTime && (
            <p className="text-sm text-destructive">{errors.preferredCallTime}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="referredBy" className="text-foreground font-medium">
            Referred By (Optional)
          </Label>
          <Input
            id="referredBy"
            name="referredBy"
            value={formData.referredBy}
            onChange={handleChange}
            placeholder="Name of person who referred you"
          />
        </div>

        <PremiumButton
          type="submit"
          className="w-full text-base py-6"
          disabled={submitMutation.isPending}
        >
          {submitMutation.isPending ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting Application...
            </>
          ) : (
            'Submit Application'
          )}
        </PremiumButton>
      </form>
    </div>
  );
}

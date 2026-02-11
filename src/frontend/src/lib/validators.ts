export function validateEmail(email: string): string | null {
  if (!email.trim()) {
    return 'Email is required';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone.trim()) {
    return 'Phone number is required';
  }
  
  // Basic validation - at least 10 digits
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < 10) {
    return 'Please enter a valid phone number';
  }
  
  return null;
}

export function validateLinkedIn(linkedin: string): string | null {
  if (!linkedin.trim()) {
    return 'LinkedIn profile is required';
  }
  
  // Accept either URL or handle
  const isUrl = linkedin.includes('linkedin.com');
  const isHandle = /^[a-zA-Z0-9-]+$/.test(linkedin);
  
  if (!isUrl && !isHandle) {
    return 'Please enter a valid LinkedIn URL or handle';
  }
  
  return null;
}

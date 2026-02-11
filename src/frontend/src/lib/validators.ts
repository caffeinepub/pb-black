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
  const phoneRegex = /^[\d\s+()-]{10,}$/;
  if (!phoneRegex.test(phone)) {
    return 'Please enter a valid phone number';
  }
  return null;
}

export function validateLinkedIn(linkedin: string): string | null {
  if (!linkedin.trim()) {
    return 'LinkedIn profile is required';
  }
  const urlRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub)\/[\w-]+\/?$/i;
  const handleRegex = /^[\w-]+$/;
  
  if (!urlRegex.test(linkedin) && !handleRegex.test(linkedin)) {
    return 'Please enter a valid LinkedIn profile URL or handle';
  }
  return null;
}

export function validateHealthCover(cover: string): string | null {
  const coverNum = Number(cover);
  if (isNaN(coverNum) || coverNum < 0) {
    return 'Please enter a valid amount';
  }
  return null;
}

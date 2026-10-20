import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function saveFormSubmission(type: string, data: Record<string, unknown>): void {
  try {
    const existing = JSON.parse(localStorage.getItem('tfg_form_submissions') || '[]');
    existing.unshift({
      id: `SUB-${Date.now()}`,
      type,
      data,
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem('tfg_form_submissions', JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to save submission to localStorage:', e);
  }
}

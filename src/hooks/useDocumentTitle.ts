import { useEffect } from 'react';
import { siteConfig } from '@/config/site';

export function useDocumentTitle(title?: string): void {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ${siteConfig.businessName} — ${siteConfig.subBrand}`;
    } else {
      document.title = `${siteConfig.businessName} | ${siteConfig.subBrand} — Luxury Mirrored & Crushed Diamond Furniture UK`;
    }
  }, [title]);
}

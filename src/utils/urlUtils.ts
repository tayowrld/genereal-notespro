
import slugify from 'slugify';

export const generateSheetUrl = (title: string, existingUrls: string[] = []): string => {
  const baseSlug = slugify(title, { lower: true, strict: true });
  let counter = 1;
  let finalSlug = `${baseSlug}-${String(counter).padStart(2, '0')}`;
  
  while (existingUrls.includes(finalSlug)) {
    counter++;
    finalSlug = `${baseSlug}-${String(counter).padStart(2, '0')}`;
  }
  
  return finalSlug;
};

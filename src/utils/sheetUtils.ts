
export interface SheetMetadata {
  id: string;
  title: string;
  url: string;
  content: string;
  created: string;
  lastModified: string;
  editHistory: string[];
}

export const generateSheetUrl = (title: string): string => {
  const cyrillicToLatin: { [key: string]: string } = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
    'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
  };

  const latinTitle = title.toLowerCase().split('').map(char => 
    cyrillicToLatin[char] || char
  ).join('');

  const baseUrl = latinTitle.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const sheets = getAllSheets();
  const similarUrls = sheets.filter(sheet => sheet.url.startsWith(baseUrl));

  if (similarUrls.length === 0) return `${baseUrl}-01`;

  const maxNumber = Math.max(...similarUrls.map(sheet => {
    const match = sheet.url.match(/-(\d+)$/);
    return match ? parseInt(match[1]) : 0;
  }));

  return `${baseUrl}-${String(maxNumber + 1).padStart(2, '0')}`;
};

export const createSheet = (title: string): SheetMetadata => {
  const url = generateSheetUrl(title);
  const now = new Date().toISOString();
  const sheet: SheetMetadata = {
    id: url,
    title,
    url,
    content: '',
    created: now,
    lastModified: now,
    editHistory: [now]
  };
  
  localStorage.setItem(`sheet-${url}`, JSON.stringify(sheet));
  return sheet;
};

export const deleteSheet = (url: string): void => {
  localStorage.removeItem(`sheet-${url}`);
};

export const getAllSheets = (): SheetMetadata[] => {
  return Object.keys(localStorage)
    .filter(key => key.startsWith('sheet-'))
    .map(key => JSON.parse(localStorage.getItem(key) || '{}'))
    .filter(sheet => sheet.url)
    .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
};

export const saveSheet = (sheet: SheetMetadata): void => {
  const now = new Date().toISOString();
  sheet.lastModified = now;
  sheet.editHistory.push(now);
  localStorage.setItem(`sheet-${sheet.url}`, JSON.stringify(sheet));
};

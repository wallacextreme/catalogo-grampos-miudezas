export interface Product {
  id: string;
  sourceDoc: string;
  category: string;
  boxNumber: string;
  internalCode: string;
  refCodes: string[];
  description: string;
  cleanDescription: string;
  carmakers: string[];
  technicalSpecs: string[];
  images: string[];
  thumbnail: string;
  needsDescriptionReview: boolean;
  price: number | null;
  updatedAt: string;
  isCustom?: boolean;
  userEdited?: boolean;
  notes?: string;
}

export interface CatalogSeed {
  catalogVersion: string;
  generatedAt: string;
  totalItems: number;
  categories: string[];
  items: Product[];
}

export type VisualStatusFilter = 'all' | 'with-photo' | 'without-photo' | 'needs-review';
export type ViewMode = 'grid' | 'mural';

export interface FilterState {
  query: string;
  category: string;
  carmaker: string;
  status: VisualStatusFilter;
  viewMode: ViewMode;
  showPrices: boolean;
  theme: 'light' | 'dark';
}

export interface BoxSummary {
  boxNumber: string;
  itemCount: number;
  categories: string[];
  items: Product[];
  sampleThumbnail: string;
}

export interface ConvertedWebPResult {
  webpBlob: Blob;
  dataUrl: string;
  sha256: string;
  width: number;
  height: number;
}

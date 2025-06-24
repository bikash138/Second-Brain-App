export interface Thought {
  id: string;
  type: 'TEXT' | 'VIDEO' | 'TWEET' | 'LINK';
  title: string;
  content?: string;
  url?: string
  createdAt: Date;
  color?: string
}

export interface SearchResult {
  id: string;
  metadata: {
    title: string;
    type: string;
    createdAt: string;
  };
  pageContent: string;
}

export interface Video extends Thought {
  type: 'VIDEO';
  videoId: string;
  thumbnail: string;
}

export interface Tweet extends Thought {
  type: 'TWEET';
  imageUrl: string;
}

export interface Link extends Thought {
  type: 'LINK';
  url: string;
}

export interface Text extends Thought {
  type: 'LINK';
  fileName: string;
  fileType: string
}

export interface Image extends Thought {
  type: 'LINK';
  imageUrl: string;
}
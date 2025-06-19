export interface Note {
  id: string;
  type: 'TEXT' | 'VIDEO' | 'TWEET' | 'LINK';
  title: string;
  content: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface YouTubeNote extends Note {
  type: 'VIDEO';
  videoId: string;
  thumbnail: string;
}

export interface TweetNote extends Note {
  type: 'TWEET';
  imageUrl: string;
}

export interface LinkNote extends Note {
  type: 'LINK';
  url: string;
}
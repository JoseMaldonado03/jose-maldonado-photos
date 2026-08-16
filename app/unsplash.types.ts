export type CollectionPhotos = Photo[];

export interface Photo {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  user: User;
  current_user_collections: CurrentUserCollection[];
  urls: Urls;
  links: Links2;
}

export interface User {
  id: string;
  username: string;
  name: string;
  portfolio_url: string;
  bio: string;
  location: string;
  total_collections: number;
  instagram_username: string;
  twitter_username: string;
  profile_image: ProfileImage;
  links: Links;
}

export interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface Links {
  self: string;
  html: string;
  photos: string;
}

export interface CurrentUserCollection {
  id: number;
  title: string;
  published_at: string;
  last_collected_at: string;
  updated_at: string;
  cover_photo: Photo;
  user: Photo;
}

export interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface Links2 {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export interface Collection {
  id: number;
  title: string;
  description: string;
  published_at: string;
  last_collected_at: string;
  updated_at: string;
  total_photos: number;
  private: boolean;
  share_key: string;
  cover_photo: CoverPhoto;
  user: User2;
  links: Links4;
}

export interface CoverPhoto {
  id: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  user: User;
  urls: Urls;
  links: Links2;
}

export interface User {
  id: string;
  username: string;
  name: string;
  portfolio_url: string;
  bio: string;
  location: string;
  total_collections: number;
  profile_image: ProfileImage;
  links: Links;
}

export interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface Links {
  self: string;
  html: string;
  photos: string;
}

export interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface Links2 {
  self: string;
  html: string;
  download: string;
}

export interface User2 {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  portfolio_url: string;
  bio: string;
  location: string;
  total_collections: number;
  profile_image: ProfileImage2;
  links: Links3;
}

export interface ProfileImage2 {
  small: string;
  medium: string;
  large: string;
}

export interface Links3 {
  self: string;
  html: string;
  photos: string;
}

export interface Links4 {
  self: string;
  html: string;
  photos: string;
  related: string;
}

export type Collections = Collection[];

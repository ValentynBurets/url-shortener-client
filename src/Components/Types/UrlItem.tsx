import { PersonInfo } from "./PersonInfo";

export interface CreateUrlItem{
  url: string;
  shorturl: string;
}

export interface ShortUrlItem{
  id: string;
  url: string;
  shortUrl: string;
}

export interface UrlItem{
  id: string;
  creatorId: string;
  url: string;
  shortUrl: string;
  createdDate: string;
}

import {
  API_HACKER_NEWS_NEW_STORIES,
  API_HACKER_NEWS_TOP_STORIES,
  API_HACKER_NEWS_BEST_STORIES,
} from "./constants";

export type HackerNewsItemType = {
  id: number;
  by?: string;
  descendants?: number;
  kids?: number[];
  score?: number;
  time?: number;
  title?: string;
  type?: string;
  url?: string;
};

export type API_STORY_TYPES =
  | typeof API_HACKER_NEWS_TOP_STORIES
  | typeof API_HACKER_NEWS_BEST_STORIES
  | typeof API_HACKER_NEWS_NEW_STORIES;

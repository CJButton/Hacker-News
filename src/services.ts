import axios, { AxiosError } from "axios";
import { HackerNewsItemType } from "./App";

// TODO: Set ENV file for APP_URL
const API_HACKER_NEWS_PREFIX = "https://hacker-news.firebaseio.com/v0/";
const API_HACKER_NEWS_TOP_STORIES = "topstories";
const API_HACKER_NEWS_BEST_STORIES = "beststories";

const instance = axios.create({
  baseURL: API_HACKER_NEWS_PREFIX,
  headers: { "Access-Control-Allow-Origin": "GET" },
});

export const getTopStories = async (): Promise<number[]> => {
  try {
    const res = await instance.get(`${API_HACKER_NEWS_TOP_STORIES}.json`, {
      params: {
        print: "pretty",
        orderBy: `"$priority"`,
        limitToFirst: "25",
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return Promise.reject({});
  }
};

// TODO: Improve Error Handling
export const getStory = async (id: number): Promise<HackerNewsItemType> => {
  try {
    const res = await instance.get<HackerNewsItemType>(`item/${id}.json`, {
      params: {
        print: "pretty",
      },
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return Promise.reject({});
  }
};

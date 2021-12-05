import axios from "axios";
import { HackerNewsItemType } from "./types";
import { API_HACKER_NEWS_NEW_STORIES } from "./constants";

// TODO: Set ENV file for APP_URL
const API_HACKER_NEWS_PREFIX = "https://hacker-news.firebaseio.com/v0/";

const instance = axios.create({
  baseURL: API_HACKER_NEWS_PREFIX,
  headers: { "Access-Control-Allow-Origin": "GET" },
});

export const getStories = async (
  newsType = API_HACKER_NEWS_NEW_STORIES
): Promise<number[]> => {
  try {
    const { data } = await instance.get(`${newsType}.json`, {
      params: {
        print: "pretty",
        orderBy: `"$priority"`,
        limitToFirst: "500",
      },
    });
    return data;
  } catch (err) {
    console.error(err);
    return Promise.reject({});
  }
};

// TODO: Improve Error Handling
export const getStory = async (id: number): Promise<HackerNewsItemType> => {
  try {
    const { data } = await instance.get<HackerNewsItemType>(`item/${id}.json`, {
      params: {
        print: "pretty",
      },
    });

    return data;
  } catch (err) {
    console.error(err);
    return Promise.reject({});
  }
};

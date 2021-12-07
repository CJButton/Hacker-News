import { useState, useEffect } from "react";
import { getStories, getStory } from "./services";
import { API_STORY_TYPES, HackerNewsItemType } from "./types";

export const useFetchStory = (itemID: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState<HackerNewsItemType>();

  useEffect(() => {
    const fetchStory = async () => {
      const res = await getStory(itemID);
      setItem(res);
      setIsLoading(false);
    };
    fetchStory();
  }, [itemID]);

  return { isLoading, item };
};

export const useFetchStories = (storyType: API_STORY_TYPES) => {
  const [isLoading, setIsLoading] = useState(true);
  const [stories, setStories] = useState<number[]>([]);

  useEffect(() => {
    const fetchStory = async () => {
      const res = await getStories(storyType);
      setStories(res);
      setIsLoading(false);
    };
    fetchStory();
  }, [storyType]);

  return { isLoading, stories };
};

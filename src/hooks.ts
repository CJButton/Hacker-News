import { useState, useEffect } from "react";
import { getStories, getStory } from "./services";
import { API_STORY_TYPES, HackerNewsItemType } from "./types";

export const useFetchStory = (itemID: number) => {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<HackerNewsItemType>();

  useEffect(() => {
    const fetchStory = async () => {
      const res = await getStory(itemID);
      setItem(res);
      setLoading(false);
    };
    fetchStory();
  }, [itemID]);

  return { loading, item };
};

export const useFetchStories = (storyType: API_STORY_TYPES) => {
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState<number[]>([]);

  useEffect(() => {
    const fetchStory = async () => {
      const res = await getStories(storyType);
      setStories(res);
      setLoading(false);
    };
    fetchStory();
  }, [storyType]);

  return { loading, stories };
};

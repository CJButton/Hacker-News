import { useEffect, useState } from "react";
import "./App.css";
import { getTopStories, getStory } from "./services";

/**
 * - Remove icons
 *
 * - Activiate Worker
 *
 * - Write unit tests
 *
 * - Research GraphQL
 *
 * - Clean API fetching from firebase hacker news api
 *
 * - Options for BestStories / TopStories
 *
 * - InfiniteScroll
 *
 * - Loader
 *
 * - To Top Button
 *
 * - Add title
 *
 * - Create Item component
 *
 * - Create List component
 *
 * - Refactor into InfiniteScroll or Pagination
 *
 * - Lazy loading of data
 *
 * - Error Boundary
 *
 * - Write types file
 *
 * - Write Constants file
 */

type ItemType = { itemID: number };

export type HackerNewsItemType = {
  id: number;
  by: string;
  descendants: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

const useFetchStory = (itemID: number) => {
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

const HackerNewsItem = ({ itemID }: ItemType) => {
  const { loading, item } = useFetchStory(itemID);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="item-wrapper">
      <h3>{item?.title}</h3>
      <div>{item?.by}</div>
    </div>
  );
};

const useFetchTopStories = () => {
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState<number[]>([]);

  useEffect(() => {
    const fetchStory = async () => {
      const res = await getTopStories();
      setStories(res);
      setLoading(false);
    };
    fetchStory();
  }, []);

  return { loading, stories };
};

const App = () => {
  const { loading, stories } = useFetchTopStories();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="stories-wrapper">
      {stories.map((itemID, idx) => {
        return <HackerNewsItem itemID={itemID} key={idx} />;
      })}
    </div>
  );
};

export default App;

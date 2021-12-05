import { useEffect, useState } from "react";
import "./App.css";
import classNames from "classnames";
import {
  API_HACKER_NEWS_NEW_STORIES,
  API_HACKER_NEWS_TOP_STORIES,
  API_HACKER_NEWS_BEST_STORIES,
} from "./constants";
import { API_STORY_TYPES } from "./types";

const StorySelector = ({
  setStoryType,
}: {
  setStoryType: (arg0: API_STORY_TYPES) => void;
}) => {
  const [currentStory, setStory] = useState<API_STORY_TYPES>(
    API_HACKER_NEWS_NEW_STORIES
  );

  useEffect(() => {
    setStoryType(currentStory);
  }, [setStoryType, currentStory]);

  return (
    <div className="story-selector-wrapper">
      <button
        className={classNames({
          "button-active": currentStory === API_HACKER_NEWS_NEW_STORIES,
        })}
        onClick={() => setStory(API_HACKER_NEWS_NEW_STORIES)}
      >
        New Stories
      </button>
      <button
        className={classNames({
          "button-active": currentStory === API_HACKER_NEWS_TOP_STORIES,
        })}
        onClick={() => setStory(API_HACKER_NEWS_TOP_STORIES)}
      >
        Top Stories
      </button>
      <button
        className={classNames({
          "button-active": currentStory === API_HACKER_NEWS_BEST_STORIES,
        })}
        onClick={() => setStory(API_HACKER_NEWS_BEST_STORIES)}
      >
        Best Stories
      </button>
    </div>
  );
};

export default StorySelector;

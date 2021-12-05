import { useState, useRef } from "react";
import InfiniteScroll from "./InfiniteScroll";
import StorySelector from "./StorySelector";
import Item from "./Item";
import { API_HACKER_NEWS_NEW_STORIES } from "./constants";
import { API_STORY_TYPES } from "./types";
import "./App.css";

/**
 * - Remove icons
 *
 * - Write unit tests
 *
 * - Error Boundary
 *
 */

const App = () => {
  const top = useRef<HTMLDivElement>(null);
  const [storyType, setStoryType] = useState<API_STORY_TYPES>(
    API_HACKER_NEWS_NEW_STORIES
  );

  const returnToTop = () => {
    top?.current?.scrollIntoView();
  };

  return (
    <div className="stories-wrapper">
      <div ref={top} />
      <StorySelector setStoryType={setStoryType} />
      <InfiniteScroll storyType={storyType}>
        {(itemID: number) => {
          return <Item itemID={itemID} key={itemID} />;
        }}
      </InfiniteScroll>
      <button className="to-top-button" onClick={returnToTop}>
        To Top
      </button>
    </div>
  );
};

export default App;

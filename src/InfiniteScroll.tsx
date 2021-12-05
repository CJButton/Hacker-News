import React, { useEffect, useState } from "react";
import "./App.css";
import { css } from "@emotion/react";
import CircleLoader from "react-spinners/CircleLoader";
import { useFetchStories } from "./hooks";
import { Waypoint } from "react-waypoint";
import { API_STORY_TYPES } from "./types";

const MAX_STORIES_PER_SCROLL = 20;

const override = css`
  top: 40%;
  display: block;
  margin: auto;
`;

type Props = {
  storyType: API_STORY_TYPES;
  children: (arg0: number) => React.ReactNode;
};

const InfiniteScroll = ({ children, storyType }: Props) => {
  const { loading, stories = [] } = useFetchStories(storyType);
  const [allStories, setAllStories] = useState(stories);
  const [currentStories, setCurrentStories] = useState<number[]>([]);

  useEffect(() => {
    setAllStories(stories);
    setCurrentStories([]);
  }, [stories]);

  if (loading) {
    return <CircleLoader color="rgb(252, 79, 8)" size="150px" css={override} />;
  }

  const handleOnEnter = () => {
    const newStories = allStories.slice(
      currentStories.length,
      MAX_STORIES_PER_SCROLL + currentStories.length
    );
    setCurrentStories([...currentStories, ...newStories]);
  };

  return (
    <>
      {currentStories.map((itemID: number) => {
        return children(itemID);
      })}
      <Waypoint onEnter={handleOnEnter} bottomOffset="-200px" />
    </>
  );
};

export default InfiniteScroll;

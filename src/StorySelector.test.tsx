import { render, screen } from "@testing-library/react";
import StorySelector from "./StorySelector";

test("it renders", () => {
  render(<StorySelector setStoryType={() => null} />);
  const newStories = screen.getByText(/New Stories/i);
  const topStories = screen.getByText(/Top Stories/i);
  const bestStories = screen.getByText(/Best Stories/i);

  expect(newStories).toBeInTheDocument();
  expect(topStories).toBeInTheDocument();
  expect(bestStories).toBeInTheDocument();
});

test("it defaults to the first button", () => {
  render(<StorySelector setStoryType={() => null} />);
  const buttons = screen.getAllByRole(/button/);
  expect(buttons[0].className).toBe("button-active");
  expect(buttons[1].className).not.toBe("button-active");
  expect(buttons[2].className).not.toBe("button-active");
});

test("it can change the active button", () => {
  render(<StorySelector setStoryType={() => null} />);
  const buttons = screen.getAllByRole(/button/);
  buttons[1].click();
  expect(buttons[0].className).not.toBe("button-active");
  expect(buttons[1].className).toBe("button-active");
  expect(buttons[2].className).not.toBe("button-active");
});

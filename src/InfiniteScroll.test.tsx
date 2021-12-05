import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/react";
import InfiniteScroll from "./InfiniteScroll";

const server = setupServer(
  rest.get(
    "https://hacker-news.firebaseio.com/v0/:newsType.json",
    (req, res, ctx) => {
      return res(ctx.json([1, 2, 3]));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const TestChild = ({ testNum }: { testNum: number }) => {
  return <div>{testNum}</div>;
};

test("it renders with data", async () => {
  render(
    <InfiniteScroll storyType={"topstories"}>
      {(testNum: number) => <TestChild testNum={testNum} />}
    </InfiniteScroll>
  );

  await waitFor(() => screen.getByText("1"));

  expect(screen.getByText("1")).toBeInTheDocument();
  expect(screen.getByText("2")).toBeInTheDocument();
  expect(screen.getByText("3")).toBeInTheDocument();
});

import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/react";
import Item from "./Item";

const server = setupServer(
  rest.get(
    "https://hacker-news.firebaseio.com/v0/item/:itemID.json",
    (req, res, ctx) => {
      return res(
        ctx.json({
          id: 1,
          by: "Test Name",
          title: "Test Title",
          url: "http://google.com",
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("it renders with data", async () => {
  render(<Item itemID={1} />);

  await waitFor(() => screen.getByText("Test Title"));

  const anchor = screen.getByRole("link");

  expect(screen.getByText("by Test Name")).toBeInTheDocument();
  expect(screen.getByText("Test Title")).toBeInTheDocument();
  expect(anchor).toHaveAttribute("href", `http://google.com`);
});

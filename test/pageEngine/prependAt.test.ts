import { PageEngine } from "../../src/engine";
import { Page } from "../../src/protocol";

const page = {
  id: "page",
  title: "page",
  children: [
    {
      id: "block1",
      children: [],
    },
    {
      id: "block2",
      children: [
        {
          id: "block3",
          children: [
            {
              id: "block5",
              children: [],
            },
          ],
        },
        {
          id: "block4",
          children: [],
        },
      ],
    },
  ],
} as Page;

test("prependAt", () => {
  const pageEngine = new PageEngine(page);

  const { block } = pageEngine.prependBlockAt([1, 0]);

  expect(pageEngine.page).toEqual({
    id: "page",
    title: "page",
    children: [
      {
        id: "block1",
        children: [],
      },
      {
        id: "block2",
        children: [
          {
            id: block.id,
            children: [],
          },
          {
            id: "block3",
            children: [
              {
                id: "block5",
                children: [],
              },
            ],
          },
          {
            id: "block4",
            children: [],
          },
        ],
      },
    ],
  });
});

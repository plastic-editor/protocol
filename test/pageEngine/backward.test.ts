import { PageEngine } from "../../src/engine";
import { Page } from "../../src/protocol";

/**
 * - page
 *  - block1
 *  - block2
 *    - block3
 *      - block5
 *    - block4
 */
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

test("backward", () => {
  const pageEngine = new PageEngine(page);

  pageEngine.backward([1, 0, 0]);

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
            id: "block3",
            children: [],
          },
          {
            id: "block5",
            children: [],
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


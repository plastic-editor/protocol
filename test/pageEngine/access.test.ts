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

test("access", () => {
  const pageEngine = new PageEngine(page);

  expect(pageEngine.access([0]).id).toBe(page.children[0].id);
  expect(pageEngine.access([1]).id).toBe(page.children[1].id);
  expect(pageEngine.access([1, 0]).id).toBe(page.children[1].children[0].id);
  expect(pageEngine.access([1, 1]).id).toBe(page.children[1].children[1].id);
  expect(pageEngine.access([1, 0, 0]).id).toBe(page.children[1].children[0].children[0].id);
});

test("accessParent", () => {
  const pageEngine = new PageEngine(page);

  expect(pageEngine.accessParent([1, 1])[0].id).toBe(page.children[1].id);
});

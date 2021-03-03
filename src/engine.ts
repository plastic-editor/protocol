import { Block, Page, ShallowBlock } from "./protocol";
import { nanoid } from "nanoid";
import { cloneDeep } from "lodash";

export type BlockPosition = number[];

export class PageEngine {
  page: Page;

  constructor(page: Page) {
    this.page = cloneDeep(page);
    // this.pageDraft = createDraft(page);
  }

  makeNewBlock() {
    const block = {
      id: nanoid(8),
      content: "",
      pageId: this.page.id,
      references: [],
    } as Block;

    return {
      block,
      shallow: {
        id: block.id,
        children: [],
      },
    };
  }

  access(pos: BlockPosition) {
    let cur: ShallowBlock = this.page;
    for (let i = 0; i < pos.length; i++) {
      cur = cur.children[pos[i]];
    }
    return cur;
  }

  accessParent(pos: BlockPosition) {
    const parentPos = [...pos].slice(0, pos.length - 1);
    return [this.access(parentPos), parentPos] as [ShallowBlock, BlockPosition];
  }

  prependBlockAt(pos: BlockPosition, block?: ShallowBlock) {
    const blockToPrepend = block ? block : this.makeNewBlock().shallow;

    const [parent] = this.accessParent(pos);
    parent.children.splice(pos[pos.length - 1], 0, blockToPrepend);

    return {
      block: blockToPrepend,
    };
  }

  apendBlockAt(pos: BlockPosition, block?: ShallowBlock) {
    const blockToPrepend = block ? block : this.makeNewBlock().shallow;

    const [parent] = this.accessParent(pos);
    parent.children.splice(pos[pos.length - 1] + 1, 0, blockToPrepend);

    return {
      block: blockToPrepend,
    };
  }

  remove(pos: BlockPosition) {
    const [parent] = this.accessParent(pos);
    const removed = parent.children.splice(pos[pos.length - 1], 1);
    return removed[0];
  }

  forward(pos: BlockPosition) {
    if (pos[pos.length - 1] !== 0) {
      /**
       * - a
       * - b
       * - c
       *
       * forwared `b` will become
       *
       * - a
       *  - b
       *  - c
       */
      const brotherPos = [
        ...[...pos].splice(0, pos.length - 1),
        pos[pos.length - 1] - 1,
      ];

      // remove current
      const removed = this.remove(pos);

      // append to brother
      const brother = this.access(brotherPos);
      brother.children.push(removed);
    } else {
      /**
       * - a
       *  - b
       *  - c
       *
       * forwared `b` will do nothing
       *
       */
    }
  }

  /**
   * - a
   * - b
   *  - f
   *  - c
   * - d
   *
   * backward `c` will become
   *
   * - a
   * - b
   *  - f
   * - c
   * - d
   */
  backward(pos: BlockPosition) {
    const [parent, parentPos] = this.accessParent(pos);
    const removed = this.remove(pos);
    const [ grandParent ] = this.accessParent(parentPos)
    grandParent.children.splice(parentPos[parentPos.length - 1] + 1, 0, removed)
  }

  stringify() {
    return JSON.stringify(this.page, null, 2);
  }

  // async end() {
  //   const newPage = finishDraft(this.pageDraft);
  //   // this.page = newPage
  //   // this.pageDraft = createDraft(newPage)
  //   return newPage;
  // }
}

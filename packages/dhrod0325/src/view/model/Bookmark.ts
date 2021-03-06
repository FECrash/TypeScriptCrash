export interface BookmarkItem {
  _id: string;
  url: number;
  image?: string;
}

export class Bookmark {
  private items: Array<BookmarkItem>;

  constructor(items: Array<BookmarkItem> = []) {
    this.items = items;
  }

  addAll(bookmarkList: Array<BookmarkItem>): void {
    this.items = [...this.items, ...bookmarkList];
  }

  add(bookmark: BookmarkItem): void {
    this.items = [...this.items, { ...bookmark }];
  }

  remove(url: number): void {
    this.items = [...this.items].filter(bookMark => +url !== +bookMark.url);
  }

  clear() {
    this.items = [];
  }

  isMarked(url: number): boolean {
    for (const bookmark of this.items) {
      if (+url === +bookmark.url) {
        return true;
      }
    }

    return false;
  }
}

// src/repository/pageRepository.ts
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';

export class PageRepository {
  private static getPageDB(slug: string, locale: string) {
    const dbPath = path.resolve('../../database', 'pages', locale, slug, 'page.json');
    const adapter = new FileSync(dbPath);
    return low(adapter);
  }

  static getPage(slug: string, locale: string) {
    const db = this.getPageDB(slug, locale);
    return db.value(); // get the entire JSON value since it's specific to the page
  }
}
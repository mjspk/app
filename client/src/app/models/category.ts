export class Category {
  name!: string;
  constructor(name: string) {
    this.name = name;
  }
}

export class Categories {
 
   static categories: Category[] = [
    new Category('All'),
    new Category('Art'),
    new Category('Biography'),
    new Category('Business'),
    new Category('Children'),
    new Category('Comics'),
    new Category('Cookbooks'),
    new Category('Ebooks'),
    new Category('Fantasy'),
    new Category('Fiction'),
    new Category('Graphic Novels'),
    new Category('Historical Fiction'),
    new Category('History'),
    new Category('Horror'),
    new Category('Mystery'),
    new Category('Nonfiction'),
    new Category('Paranormal'),
    new Category('Philosophy'),
    new Category('Poetry'),
    new Category('Psychology'),
    new Category('Religion'),
    new Category('Romance'),
    new Category('Science'),
    new Category('Science Fiction'),
    new Category('Self Help'),
    new Category('Suspense'),
    new Category('Spirituality'),
    new Category('Sports'),
    new Category('Thriller'),
    new Category('Travel'),
    new Category('Young Adult')
  ];
  static getAll(): Category[] {

    return this.categories;
  }

}
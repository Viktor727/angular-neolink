export interface Item {
  name: string;
  items: Item[];
}

export interface Subcategory {
  name: string;
  items: Item[];
}

export interface Category {
  name: string;
  subcategories: Subcategory[];
}

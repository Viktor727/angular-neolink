import { Component } from '@angular/core';
import { Category } from './category.model';

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss'],
})
export class CategoryTreeComponent {
  searchTerm: string = '';
  categories: Category[] = [
    {
      name: 'Category 1',
      subcategories: [
        {
          name: 'Subcategory 1-1',
          items: [{ name: 'Item 1-1-1' }, { name: 'Item 1-1-2' }],
        },
        {
          name: 'Subcategory 1-2',
          items: [{ name: 'Item 1-2-1' }, { name: 'Item 1-2-2' }],
        },
      ],
    },
    {
      name: 'Category 2',
      subcategories: [
        {
          name: 'Subcategory 2-1',
          items: [{ name: 'Item 2-1-1' }, { name: 'Item 2-1-2' }],
        },
      ],
    },
  ];

  expandedCategories: Set<string> = new Set();
  expandedSubcategories: Map<string, Set<string>> = new Map();

  toggleCategory(categoryName: string) {
    if (this.expandedCategories.has(categoryName)) {
      this.expandedCategories.delete(categoryName);
    } else {
      this.expandedCategories.add(categoryName);
    }
  }

  isCategoryExpanded(categoryName: string): boolean {
    return this.expandedCategories.has(categoryName);
  }

  toggleSubcategory(categoryName: string, subcategoryName: string) {
    if (!this.expandedSubcategories.has(categoryName)) {
      this.expandedSubcategories.set(categoryName, new Set());
    }
    const subcategorySet = this.expandedSubcategories.get(categoryName)!;

    if (subcategorySet.has(subcategoryName)) {
      subcategorySet.delete(subcategoryName);
    } else {
      subcategorySet.add(subcategoryName);
    }
  }

  isSubcategoryExpanded(
    categoryName: string,
    subcategoryName: string
  ): boolean {
    return (
      this.expandedSubcategories.get(categoryName)?.has(subcategoryName) ||
      false
    );
  }

  get filteredItems() {
    if (!this.searchTerm) {
      return this.categories;
    }
    return this.categories
      .map((category) => ({
        ...category,
        subcategories: category.subcategories
          .map((subcategory) => ({
            ...subcategory,
            items: subcategory.items.filter((item) =>
              item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            ),
          }))
          .filter((sub) => sub.items.length > 0),
      }))
      .filter((cat) => cat.subcategories.length > 0);
  }
}

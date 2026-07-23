import { Injectable } from '@nestjs/common';
import { mockData } from '../data'
import type { CreateCategoryDto } from './dto/create-category.dto';
import type { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  findAll() {
    return mockData.categories;
  }

  findOne(id: number) {
    return mockData.categories.find((c) => c.id === id);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return 'This action updates a category';
  }

  remove(id: number) {
    return 'This action removes a category';
  }
}

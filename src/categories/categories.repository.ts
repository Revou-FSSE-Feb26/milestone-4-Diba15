import { Injectable, NotFoundException } from '@nestjs/common';
import { mockData } from '../data';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesRepository {
  findAll(): CreateCategoryDto[] {
    return mockData.categories;
  }

  findOne(id: number): CreateCategoryDto {
    return mockData.categories.find(
      (category) => category.id === id,
    ) as CreateCategoryDto;
  }

  create(createCategoryDto: CreateCategoryDto): CreateCategoryDto {
    const newData: CreateCategoryDto = {
      ...createCategoryDto,
      id: mockData.categories.length + 1,
    };
    mockData.categories.push(newData);
    return newData;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto): UpdateCategoryDto {
    const currentData = this.findOne(id);

    if (!currentData) throw new NotFoundException('Category not found');

    const updatedData = { ...currentData, ...updateCategoryDto };
    mockData.categories = mockData.categories.map((category) =>
      category.id === id ? updatedData : category,
    );
    return updatedData;
  }

  remove(id: number) {
    const categoryToRemove = this.findOne(id);

    if (!categoryToRemove) throw new NotFoundException('Category not found');

    mockData.categories = mockData.categories.filter(
      (category) => category.id !== id,
    );
    return {
      message: 'Category deleted successfully',
      categoryToRemove,
    };
  }
}

import { CreateCategoryDto } from '../../categories/dto/create-category.dto';
import { UpdateCategoryDto } from '../../categories/dto/update-category.dto';

export interface CategoriesRepositoryInterface {
  findAll(): Promise<any>;
  findOne(id: number): Promise<any>;
  create(createCategoryDto: CreateCategoryDto): Promise<any>;
  update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<any>;
  remove(id: number): Promise<any>;
}

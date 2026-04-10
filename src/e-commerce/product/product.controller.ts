import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() body:any){
    return this.productService.create(body);
  }
  @Get()
  getAllProducts(){
    return this.productService.getAllProducts();
  }
  @Get(':id')
  getProductById(@Param('id') id:string){
    return this.productService.getProductById(Number(id));
  }
  @Patch(':id')
  update(@Param('id') id:string,@Body() body:any){
    return this.productService.updateProductById(Number(id),body);  
  }
  @Delete(':id')
  deleteProductById(@Param('id') id:string){
    return this.productService.deleteProductById(Number(id))
  }
}

import { ProductService } from './product.service';
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService:ProductService){}

  @Post()
  createProduct(@Body() createProductDto:CreateProductDto){
    return this.productService.createProduct(createProductDto);
  }
  @Get()
  getAllProducts(){
    return this.productService.getAllProducts();
  }

  @Get(':id')
  findProductById(@Param('id') id:string){
    const product = this.productService.findProductById(id);
    if(!product){
      throw new NotFoundException('Ürün bulunamadı')
    }
    return product;
  }
  @Patch(':id')
  updateProductById(@Param('id') id:string, @Body() updateProductDto:UpdateProductDto){
    const updated = this.productService.updateProductById(id,updateProductDto) ;
    if(!updated){
      throw new NotFoundException('Güncellenecek ürün bulunamadı')
    }
    return updated;
  }
  @Delete(':id')
  deleteProductById(@Param('id') id:string){
    const product = this.productService.deleteProductById(id) ;
    if(!product){
      throw new NotFoundException('Silinecek ürün bulunamadı.')
    }
    return product;
  }

}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() body:any){
    return this.userService.createUser(body);
  }
  
  @Get()
  getAllUsers(){
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id:string){
    return this.userService.getUserById(Number(id));
  }
}

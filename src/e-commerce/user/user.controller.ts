import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() dto:CreateUserDto){
    return this.userService.createUser(dto);
  }
  
  @Get()
  getAllUsers(){
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id:string){
    return this.userService.getUserById(+id);
  }
  @Patch(':id')
  update(@Param('id') id:string,@Body() dto:UpdateUserDto){
    return this.userService.updateUser(+id,dto)
  }
  @Post('login')
  login(@Body() dto:LoginUserDto){
    return this.userService.login(dto);
  }

}

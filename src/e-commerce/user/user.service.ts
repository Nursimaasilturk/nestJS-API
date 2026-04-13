import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { dot } from 'node:test/reporters';

@Injectable()
export class UserService {
	constructor(private prisma:PrismaService){}
	createUser(data:CreateUserDto){
		return this.prisma.user.create({data});
	}
	getAllUsers(){
		return this.prisma.user.findMany();
	}
	getUserById(id:number){
		return this.prisma.user.findUnique({
			where:{
				id
			}
		})
	}
	updateUser(id:number,data:UpdateUserDto){
		return this.prisma.user.update({
			where:{
				id
			},
			data:data
		})
	}
	async login(data:LoginUserDto){
		const user = await this.prisma.user.findUnique({
			where:{
				email:data.email
			}
		});
		if(!user){
			throw new UnauthorizedException('Invalid credentials!');
		}
		if(user.password !== data.password){
			throw new UnauthorizedException('Invalid credentials!');
		}
		const {password,...result} = user;
		return result; 
	}
}

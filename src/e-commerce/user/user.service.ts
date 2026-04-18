import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
	constructor(private prisma:PrismaService){}


	async createUser(data:CreateUserDto){
		const user = await this.prisma.user.findUnique({where:{email:data.email}})
		if(user) throw new ConflictException('user already exists')
		return await this.prisma.user.create({data:data})
	}
	getAllUsers(){
		return this.prisma.user.findMany();
	}
	async getUserById(id:number){
		const user = await this.prisma.user.findUnique({
			where:{
				id
			}
		});
		if(!user){
			throw new NotFoundException('User not found')
		}
		return user;
	}
	async deleteUserById(id:number){
		const user = await this.prisma.user.findUnique({
			where:{
				id
			}
		});
		if(!user) throw new NotFoundException('User not found')
		return await this.prisma.user.delete({where:{id}});	
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

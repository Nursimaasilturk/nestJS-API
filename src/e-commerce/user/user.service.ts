import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(private prisma:PrismaService){}
	createUser(data){
		return this.prisma.user.create({data});
	}
	getAllUsers(){
		return this.prisma.user.findMany();
	}
	getUserById(id){
		return this.prisma.user.findUnique({
			where:{
				id
			}
		})
	}
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ExistingUserDTO } from 'src/user/dtos/existing-user.dto';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/user.interface';

import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    async register(user: Readonly<NewUserDTO>):Promise<UserDetails | any> {
        const { name, email, password } = user;

        const existingUser = await this.userService.findByEmail(email);

        if (existingUser) return 'User with this email already exist!';

        const hashedPassword = await this.hashPassword(password);
        const newUser = await this.userService.createUser(name, email, hashedPassword);
        return this.userService._getUserDetails(newUser);
    }

    async passwordMatch(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    async validateUser(email: string, password: string): Promise<UserDetails | null> {
        const user =  await this.userService.findByEmail(email);
        const isExist = !!user;
        if (!isExist) return null;

        const isPasswordMatch = await this.passwordMatch(password, user.password);
        if(!isPasswordMatch) return null;

        return this.userService._getUserDetails(user);
    }

    async login(currentUser: ExistingUserDTO): Promise<{token: string} | null> {
        const { email, password } = currentUser;
        const user = this.validateUser(email, password);
        if (!user) return null;

        const jwtToken = await this.jwtService.signAsync({ user });
        return { token: jwtToken };
    }
}

import { User} from './data.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [
    {
      firstName: 'Elena',
      lastName: 'Ela',  
      email: 'ela@yahoo.com',
      password:'Elena!123'
    },
    {
      firstName: 'Otilia',
      lastName: 'Chelmus',  
      email: 'otilia@yahoo.com', 
      password:'Oti!123' 

    },
  ];

  getUser(): User[] {
    return this.users;
  }

  setUser(users: User[]) {
    this.users = users;
  }

  findUser(emailUser: string, passwordUser: string): User | undefined {
    return this.users.find(user => user.email === emailUser && user.password==passwordUser);
  }

  getCertainUser(user: User): User | undefined {
    return this.users.find((elem) => elem == user);
  }

  addNewUser(user: User) {
    this.users.push(user);
    console.log(this.users);
  }
}

import { User as UserDomain, Address, Company } from '../interface/driver/userDriver'
import { Photo } from './photo';

export class User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  favorites: Photo[] | null

  constructor(userData: UserDomain) {
   this.id = userData.id
   this.name = userData.name
   this.username = userData.username
   this.email = userData.email
   this.address = userData.address
   this.phone = userData.phone
   this.website = userData.website
   this.company = userData.company
   this.favorites = userData.favorites
  }
}
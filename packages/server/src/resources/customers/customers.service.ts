import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerInput } from './dto/create-customer.input';
import CustomerResponse from './dto/customer-response';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async create(input: CreateCustomerInput): Promise<CustomerResponse> {
    try {
      const newCustomer = this.customersRepository.create({
        ...input,
      });

      const savedCustomer = await this.customersRepository.save(newCustomer);

      return { customer: savedCustomer };
    } catch (error) {
      return {
        errors: [
          {
            field: 'customer',
            message: 'An error occured while creating a new customer',
          },
        ],
      };
    }
  }

  findAll() {
    return `This action returns all customers`;
  }

  findOne(id: string) {
    return this.customersRepository.findOne({ where: { id } });
  }

  findOneByStripeId(stripeId: string) {
    return this.customersRepository.findOne({ where: { stripeId } });
  }

  findOneByUserId(stripeId: string) {
    return this.customersRepository.findOne({ where: { stripeId } });
  }

  update(id: string, updateCustomerInput: UpdateCustomerInput) {
    return `This action updates a #${id} customer`;
  }

  remove(id: string) {
    return `This action removes a #${id} customer`;
  }
}

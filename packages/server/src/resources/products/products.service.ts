import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { stripe } from '../stripe/stripe';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product, ProductName } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(stripeProductId: string, subscriptionId: string) {
    try {
      const product = await stripe.products.retrieve(stripeProductId);

      if (!product)
        return {
          errors: [
            {
              field: 'product',
              message: 'Cannot find a product on Stripe',
            },
          ],
        };

      const productInput: CreateProductInput = {
        stripeId: stripeProductId,
        name: product.name as ProductName,
        subscriptionId,
      };

      const savedProduct = await this.productsRepository.save(productInput);
      return { product: savedProduct };
    } catch (error) {
      console.log('error creating a product', error.message);
      return {
        errors: [
          {
            field: 'product',
            message: 'An error occured while creating a new product',
          },
        ],
      };
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(stripeProductId: string) {
    try {
      const existingProduct = await this.productsRepository.findOneBy({
        stripeId: stripeProductId,
      });

      if (!existingProduct)
        return {
          errors: [
            {
              field: 'product',
              message: 'Cannot find a product in my database',
            },
          ],
        };
      const stripeProduct = await stripe.products.retrieve(stripeProductId);

      if (!stripeProduct)
        return {
          errors: [
            {
              field: 'product',
              message: 'Cannot find a product on Stripe',
            },
          ],
        };

      const productInput: UpdateProductInput = {
        id: existingProduct.id,
        stripeId: stripeProductId,
        name: stripeProduct.name as ProductName,
      };

      const savedProduct = await this.productsRepository.save(productInput);
      return { product: savedProduct };
    } catch (error) {
      console.log('error creating a product', error.message);
      return {
        errors: [
          {
            field: 'product',
            message: 'An error occured while creating a new product',
          },
        ],
      };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

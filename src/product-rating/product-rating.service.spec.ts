import { Test, TestingModule } from '@nestjs/testing';
import { ProductRatingService } from './product-rating.service';

describe('ProductRatingService', () => {
  let service: ProductRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductRatingService],
    }).compile();

    service = module.get<ProductRatingService>(ProductRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

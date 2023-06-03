import { Test, TestingModule } from '@nestjs/testing';
import { ScansController } from './scans.controller';

describe('ScansController', () => {
  let controller: ScansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScansController],
    }).compile();

    controller = module.get<ScansController>(ScansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

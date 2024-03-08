import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Medicine } from 'src/schemas/medicine.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class MedicineService {
  constructor(
    @InjectModel(Medicine.name)
    private medicineModel: mongoose.Model<Medicine>,
  ) {}

  async getAllMedicines(): Promise<Medicine[]> {
    return this.medicineModel.find().exec(); // Виклик методу find() для отримання всіх даних
  }
}

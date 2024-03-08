import { Controller, Get } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { Medicine } from 'src/schemas/medicine.schema';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Get()
  async getAllMedicine(): Promise<Medicine[]> {
    return this.medicineService.getAllMedicines();
  }
}

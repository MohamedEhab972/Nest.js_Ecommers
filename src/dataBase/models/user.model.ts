import { Prop } from '@nestjs/mongoose';
import { GenderEnum } from '../../common/enums/gender.enum.js';

export class User {
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  role: string;
  @Prop()
  email: string;
  @Prop()
  age: number;
  @Prop()
  isDeleted: boolean;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  deletedAt: Date;
  @Prop({ required: true, default: GenderEnum.Male })
  gender: string;
}

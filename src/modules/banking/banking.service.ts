import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';


@Injectable()
export class BankingService {

    constructor(private readonly prisma: PrismaService) { }


    async registerPix(data) {

        const pixCreate = await this.prisma.pix_key.create({
            data: {
                key: data.key,
                key_type: data.type,
                id_user: data.user
            }
        })

        return pixCreate

    }

    async findPix(where,select?) {

        const pix = await this.prisma.pix_key.findFirst({
            where,
            select
        })

        return pix
        
    }
 
}

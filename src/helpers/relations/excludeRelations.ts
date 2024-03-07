import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export async function excludeRelations(
    id: number,
    relationsBefore: string[],
    relationsAfter: string[]
  ): Promise<{ before: any; after: any }> {
    const prisma = new PrismaClient();
  
    try {
      // Encontrar o usuário e incluir as relações antes da exclusão do usuário
      const includeBefore: Record<string, { select: Record<string, boolean> }> = {};
      relationsBefore.forEach((relation) => {
        const idColumnName = `id_${relation}`;
        includeBefore[relation] = { select: { [idColumnName]: true } };
      });
  
      const userBefore = await prisma.users.findUnique({
        where: { id_user: id },
        select: includeBefore,
      });
  
      if (!userBefore) {
        throw new Error('Usuário não encontrado');
      }
  
      const includeAfter: Record<string, { select: Record<string, boolean> }> = {};
      relationsAfter.forEach((relation) => {
        const idColumnName = `id_${relation}`;
        includeAfter[relation] = { select: { [idColumnName]: true } };
      });
  
      const userAfter = await prisma.users.findUnique({
        where: { id_user: id },
        select: includeAfter,
      });

      return { before: userBefore, after: userAfter };
    } catch (error) {
      console.error('Erro ao obter IDs para exclusão:', error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      await prisma.$disconnect();
    }
  }
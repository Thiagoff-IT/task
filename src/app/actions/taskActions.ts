'use server';

import  prisma  from '@/lib/prisma';

export const addTask = async (formData: FormData) => {
  const title = formData.get('title');
  
  await prisma.task.create({
    data: {
      title: title as string,
    },
  });
};

export const deleteTask = async (id: number) => {
  await prisma.task.delete({
    where: { id },
  });
};

export const getTasks = async () => {
  return await prisma.task.findMany();
};
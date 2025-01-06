'use server';

import { db } from '@/lib/db';
import { ActionResponse } from '@/types/actionResponse';
import { revalidatePath } from 'next/cache';

export async function DeleteContactAction(contactId: string): Promise<ActionResponse> {
  try {
    await db.contact.delete({
      where: {id: contactId}
    })

    revalidatePath('/')

    return {
      status: 'success',
      body: {contactId},
    }


  } catch (error) {
    return {
      status: 'error',
      body: {
        message: 'erro ao deletar o contato'
      },
    }
  }
}

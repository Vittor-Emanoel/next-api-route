'use client';

import { ActionResponse } from '@/types/actionResponse';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface IContactFormProps {
  contact?: {
    name: string;
    email: string;
  };
  submitAction?: (formData: FormData) => Promise<ActionResponse>;
}

export function ContactForm({ contact, submitAction }: IContactFormProps) {
  const router = useRouter();
  const [state, clientSubmitAction, isPending] = useActionState(
    async (_previousData: any, formData: FormData) =>  {
      const response = await submitAction?.(formData)

      if(response?.status === 'error') {
        alert('retornar o errorr')
      }

      if (response?.status === 'success') {
        router.push(`/contacts/${response?.body.contact.id}/edit`);
      }

      return response

    },
    null,
  );

  useEffect(() => {
    if (state?.status === 'success') {
      router.push(`/contacts/${state.body?.contact.id}/edit`);
    }
  }, [state, router]);

  console.log(state);
  return (
    <form className="space-y-4" action={clientSubmitAction}>
      <div className="space-y-1.5">
        <Label>Nome</Label>
        <Input defaultValue={contact?.name} name="name" />
      </div>

      <div className="space-y-1.5">
        <Label>E-mail</Label>
        <Input defaultValue={contact?.email} name="email" />
      </div>

      {/*posso usar o useFormStatus se esse botao for filho */}
      <Button type="submit" disabled={isPending}>
        {isPending && <Loader2 className="size-4 mr-1 animate-spin" />}
        {contact ? 'Salvar' : 'Criar'}
      </Button>
    </form>
  );
}

import { ContactForm } from '@/components/ContactForm';
import { db } from '@/lib/db';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';


interface CreateContactPageProps {
  params: {
    contactId: string
  }
}

export default async function CreateContactPage({params}: CreateContactPageProps) {
  const contact = await db.contact.findUnique({
    where: {
      id: params.contactId
    }
  })

  if(!contact)  {
   return redirect('/')
  }

  return (
    <>
      <header>
        <Link
          href="/"
          className="text-muted-foreground flex items-center gap-1 text-xs mb-2 dark:hover:text-sky-300 hover:text-sky-600"
        >
          <ArrowLeftIcon className="size-4" />
          <span>Voltar para a lista</span>
        </Link>
        <h1 className="font-semibold text-3xl tracking-tighter">
          Editar contato
        </h1>
      </header>

      <ContactForm contact={contact} />
    </>
  );
}

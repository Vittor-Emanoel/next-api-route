import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import EditContactForm from './editContactForm';


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

  return <EditContactForm contact={contact} />
}

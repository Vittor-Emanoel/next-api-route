import { db } from '@/lib/db';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const {name, email} = await request.json()

  if(!name || !email) {
    return NextResponse.json({
      message: 'Name and Email are required!'
    }, {
      status: 400
    })
  }

  const emailAlreadyInUse = await db.contact.findUnique({
    where: {email},
    select: {
      id: true,
      email: true
    }
  })

  if(emailAlreadyInUse) {
    return NextResponse.json({
      message: 'This Email is already in use!'
    }, {
      status: 409
    })
  }

  const contact = await db.contact.create({
    data: {
      name, email
    }
  })


  return NextResponse.json({
    contact
  }, {
    status: 201,
  })
}

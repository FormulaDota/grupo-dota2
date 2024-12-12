import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'

const prisma = new PrismaClient()

export async function GET() {
  const session = await getServerSession()
  if (!session?.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const queueEntry = await prisma.queueEntry.findFirst({
      where: {
        user: {
          id: session.user.id,
        },
        status: {
          not: 'COMPLETED',
        },
      },
    })

    return NextResponse.json({
      isPresent: queueEntry?.isPresent ?? false,
    })
  } catch (error) {
    console.error('Failed to fetch presence:', error)
    return NextResponse.json(
      { error: 'Failed to fetch presence' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session?.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const { isPresent } = await request.json()

    const queueEntry = await prisma.queueEntry.updateMany({
      where: {
        user: {
          id: session.user.id,
        },
        status: {
          not: 'COMPLETED',
        },
      },
      data: {
        isPresent,
      },
    })

    return NextResponse.json({ isPresent })
  } catch (error) {
    console.error('Failed to update presence:', error)
    return NextResponse.json(
      { error: 'Failed to update presence' },
      { status: 500 }
    )
  }
}

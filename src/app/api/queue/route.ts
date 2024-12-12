import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const queueEntries = await prisma.queueEntry.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return NextResponse.json(queueEntries)
  } catch (error) {
    console.error('Failed to fetch queue:', error)
    return NextResponse.json(
      { error: 'Failed to fetch queue' },
      { status: 500 }
    )
  }
}

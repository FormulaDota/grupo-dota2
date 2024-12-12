import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session?.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // TODO: Add admin check here

  try {
    const { entryId, result, tokenUsed } = await request.json()
    
    const mmrChange = result === 'WIN' ? 25 : -25
    const finalMmrChange = tokenUsed ? mmrChange * 2 : mmrChange

    // Create match result
    await prisma.match.create({
      data: {
        queueEntryId: entryId,
        result,
        mmrChange: finalMmrChange,
        tokenUsed,
      },
    })

    // Update queue entry MMR
    const queueEntry = await prisma.queueEntry.update({
      where: {
        id: entryId,
      },
      data: {
        currentMmr: {
          increment: finalMmrChange,
        },
      },
    })

    // Check if target MMR is reached
    if (queueEntry.currentMmr >= queueEntry.targetMmr) {
      await prisma.queueEntry.update({
        where: {
          id: entryId,
        },
        data: {
          status: 'COMPLETED',
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to submit match result:', error)
    return NextResponse.json(
      { error: 'Failed to submit match result' },
      { status: 500 }
    )
  }
}

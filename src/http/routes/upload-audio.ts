import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'
import { generateEmbeddings, transcribeAudio } from '../../services/gemini.ts'

export const uploadAudioRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/audio',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params
      const audio = await request.file()

      if (!audio) {
        throw new Error('No audio file uploaded')
      }

      const audioBuffer = await audio.toBuffer()
      const audioBase64 = audioBuffer.toString('base64')

      const transcription = await transcribeAudio(audioBase64, audio.mimetype)
      const embeddings = await generateEmbeddings(transcription)

      const result = await db
        .insert(schema.audioChunks)
        .values({
          roomId,
          transcription,
          embeddings,
        })
        .returning()

      const chunk = result[0]

      if (!chunk) {
        throw new Error('Failed to save audio chunk')
      }

      return reply.status(201).send({ chunkId: chunk.id })
    }
  )
}

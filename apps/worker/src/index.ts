import { Worker } from "bullmq";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { prisma } from "@repo/database/prisma"

const worker = new Worker("second-brain", async (job) => {
    try {
      const newlyUploadedThought = await prisma.thought.findFirst({
        where: {
          id: Number(job.data?.noteId),
        },
        select: {
          id: true,
          title: true,
          type: true,
          content: true,
          createdAt: true
        },
      });

      if (newlyUploadedThought) {
        const document = new Document({
          pageContent: `${newlyUploadedThought.title}\n${newlyUploadedThought.content ?? ""}`, 
          metadata: {
            id: newlyUploadedThought.id,
            title: newlyUploadedThought.title,
            type: newlyUploadedThought.type,
            createdAt: newlyUploadedThought.createdAt
          },
        });
        const embeddings = new OpenAIEmbeddings({
            model: "text-embedding-3-small",
            openAIApiKey: process.env.API_KEY_OPENAI as string
        });
        await QdrantVectorStore.fromDocuments(
            [document],
            embeddings,
            {
              url: "http://qdrant:6333",
              collectionName: "second-brain-testing",
            }
        );
        console.log("Ingestion Done for job id: ", job.data?.noteId);
      }
    } catch (error) {
      console.error("Worker error:", error);
    }
  },
  {
    concurrency: 100,
    connection: { host: "valkey", port: 6379 },
  }
);

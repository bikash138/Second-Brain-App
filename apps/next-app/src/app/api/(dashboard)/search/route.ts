/* eslint-disable */
import { getCurrentUser } from "@/utils/getCurrentUser";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { search } = await req.json()
        if (!search) {
            return NextResponse.json(
                { message: "Missing search query" },
                { status: 400 }
        )};
        const embeddings = new OpenAIEmbeddings({
            model: "text-embedding-3-small",
            openAIApiKey: process.env.API_KEY_OPENAI as string
        });
        const vectorStore = await QdrantVectorStore.fromExistingCollection(
            embeddings,
            {
              url: "http://qdrant:6333",
              collectionName: "second-brain-testing",
            }
        );
        const userQuery = search;
        const topK = 3;
        const minScore = 0.2;

        const resultsWithScores = await vectorStore.similaritySearchWithScore(userQuery, topK);

        // Filter by score
        const filteredResults = resultsWithScores
          .filter(([doc, score]) => score >= minScore)
          .map(([doc]) => doc);

        return NextResponse.json({
          message: "Semantic Search Result Fetched Successfully",
          results: filteredResults,
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            message: "Something went wrong while semantic Search",
            error: error
        },{ status: 500 })
    }
}
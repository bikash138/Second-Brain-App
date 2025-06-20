import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{
        const { search } = await req.json()
        if (!search) {
            return NextResponse.json(
                { message: "Missing search query" },
                { status: 400 }
        )};
        const embeddings = new OpenAIEmbeddings({
            model: "text-embedding-3-small",
            openAIApiKey: ""
        });
        const vectorStore = await QdrantVectorStore.fromExistingCollection(
            embeddings,
            {
              url: "http://localhost:6333",
              collectionName: "second-brain-testing",
            }
        );
        const userQuery = search;
        const topK = 3;
        const minScore = 0.2; // adjust as needed (for cosine similarity, closer to 1 is more similar)

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
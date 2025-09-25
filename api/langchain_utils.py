from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from typing import List
from langchain_core.documents import Document
import os
from chroma_utils import vectorstore
retriever = vectorstore.as_retriever(search_kwargs={"k": 2})

output_parser = StrOutputParser()




# Set up prompts and chains
contextualize_q_system_prompt = (
    "Given a chat history and the latest user question "
    "which might reference context in the chat history, "
    "formulate a standalone question which can be understood "
    "without the chat history. Do NOT answer the question, "
    "just reformulate it if needed and otherwise return it as is."
)

contextualize_q_prompt = ChatPromptTemplate.from_messages([
    ("system", contextualize_q_system_prompt),
    MessagesPlaceholder("chat_history"),
    ("human", "{input}"),
])



qa_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful AI assistant. Use the following context to answer the user's question."),
    ("system", "Context: {context}"),
    MessagesPlaceholder(variable_name="chat_history"),
    ("human", "{input}")
])



def get_rag_chain(model="gemini-2.5-flash-lite"):
    try:
        # Try to use Google Gemini
        google_api_key = os.getenv("GOOGLE_API_KEY", "dummy_key_for_testing")
        if google_api_key == "dummy_key_for_testing":
            print("Warning: Using dummy API key for LLM. Set GOOGLE_API_KEY environment variable for production use.")
        
        llm = ChatGoogleGenerativeAI(model=model, google_api_key=google_api_key)
        history_aware_retriever = create_history_aware_retriever(llm, retriever, contextualize_q_prompt)
        question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)
        rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)    
        return rag_chain
    except Exception as e:
        print(f"Error initializing LLM: {e}")
        print("Falling back to a simple LLM...")
        # Fallback to a simple LLM for testing
        from langchain_community.llms import FakeListLLM
        responses = ["I'm a test AI assistant. I can help you with questions about your documents, but I'm currently running in test mode. Please set up your Google API key for full functionality."]
        llm = FakeListLLM(responses=responses)
        history_aware_retriever = create_history_aware_retriever(llm, retriever, contextualize_q_prompt)
        question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)
        rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)    
        return rag_chain
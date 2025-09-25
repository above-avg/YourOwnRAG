from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader, UnstructuredHTMLLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma
from typing import List
from langchain_core.documents import Document
import os

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200, length_function=len)

# Try to get Google API key, fallback to a dummy key for testing
google_api_key = os.getenv("GOOGLE_API_KEY", "dummy_key_for_testing")
if google_api_key == "dummy_key_for_testing":
    print("Warning: Using dummy API key. Set GOOGLE_API_KEY environment variable for production use.")

try:
    embedding_function = GoogleGenerativeAIEmbeddings(model="gemini-embedding-001", google_api_key=google_api_key)
    vectorstore = Chroma(persist_directory="./chroma_db", embedding_function=embedding_function)
except Exception as e:
    print(f"Error initializing embeddings: {e}")
    print("Falling back to a simple embedding function...")
    # Fallback to a simple embedding function
    from langchain_community.embeddings import FakeEmbeddings
    embedding_function = FakeEmbeddings(size=768)
    vectorstore = Chroma(persist_directory="./chroma_db", embedding_function=embedding_function)

def load_and_split_document(file_path: str) -> List[Document]:
    if file_path.endswith('.pdf'):
        loader = PyPDFLoader(file_path)
    elif file_path.endswith('.docx'):
        loader = Docx2txtLoader(file_path)
    elif file_path.endswith('.html'):
        loader = UnstructuredHTMLLoader(file_path)
    else:
        raise ValueError(f"Unsupported file type: {file_path}")
    
    documents = loader.load()
    return text_splitter.split_documents(documents)

def index_document_to_chroma(file_path: str, file_id: int) -> bool:
    try:
        splits = load_and_split_document(file_path)
        
        # Add metadata to each split
        for split in splits:
            split.metadata['file_id'] = file_id
        
        vectorstore.add_documents(splits)
        # vectorstore.persist()
        return True
    except Exception as e:
        print(f"Error indexing document: {e}")
        return False

def delete_doc_from_chroma(file_id: int):
    try:
        docs = vectorstore.get(where={"file_id": file_id})
        print(f"Found {len(docs['ids'])} document chunks for file_id {file_id}")
        
        vectorstore._collection.delete(where={"file_id": file_id})
        print(f"Deleted all documents with file_id {file_id}")
        
        return True
    except Exception as e:
        print(f"Error deleting document with file_id {file_id} from Chroma: {str(e)}")
        return False
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic_models import QueryInput, QueryResponse, DocumentInfo, DeleteFileRequest
from langchain_utils import get_rag_chain
from db_utils import insert_application_logs, get_chat_history, get_all_documents, insert_document_record, delete_document_record
from chroma_utils import index_document_to_chroma, delete_doc_from_chroma
import os
import uuid
import shutil
import logging

# Setup logging
logging.basicConfig(filename='app.log', level=logging.INFO)

app = FastAPI(title="RAG Document API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to frontend URL if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files (frontend)
if os.path.exists("static"):
    app.mount("/", StaticFiles(directory="static", html=True), name="static")

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "RAG API is running"}

# ------------------ CHAT ENDPOINT ------------------
@app.post("/chat", response_model=QueryResponse)
def chat(query_input: QueryInput):
    session_id = query_input.session_id or str(uuid.uuid4())
    logging.info(f"Session ID: {session_id}, User Query: {query_input.question}, Model: {query_input.model.value}")

    chat_history = get_chat_history(session_id)
    rag_chain = get_rag_chain(query_input.model.value)
    answer = rag_chain.invoke({
        "input": query_input.question,
        "chat_history": chat_history
    })['answer']

    insert_application_logs(session_id, query_input.question, answer, query_input.model.value)
    logging.info(f"Session ID: {session_id}, AI Response: {answer}")

    return QueryResponse(answer=answer, session_id=session_id, model=query_input.model)

# ------------------ UPLOAD DOCUMENT ------------------
@app.post("/upload-docs")
def upload_and_index_document(file: UploadFile = File(...)):
    allowed_extensions = ['.pdf', '.docx', '.html']
    file_extension = os.path.splitext(file.filename)[1].lower()

    if file_extension not in allowed_extensions:
        raise HTTPException(status_code=400, detail=f"Unsupported file type. Allowed types are: {', '.join(allowed_extensions)}")

    temp_file_path = f"temp_{uuid.uuid4().hex}_{file.filename}"

    try:
        # Save the uploaded file to a temporary path
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Insert into DB and index
        file_id = insert_document_record(file.filename)
        success = index_document_to_chroma(temp_file_path, file_id)

        if success:
            logging.info(f"Uploaded and indexed document: {file.filename} (ID: {file_id})")
            return {"message": f"File {file.filename} successfully uploaded and indexed.", "file_id": file_id}
        else:
            delete_document_record(file_id)
            raise HTTPException(status_code=500, detail=f"Failed to index {file.filename}.")
    finally:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)

# ------------------ LIST DOCUMENTS ------------------
@app.get("/list-docs", response_model=list[DocumentInfo])
def list_documents():
    documents = get_all_documents()
    mapped_docs = [
        {
            "file_id": str(doc["id"]),  # map 'id' to 'file_id' and ensure it's a string
            "filename": doc["filename"]
        }
        for doc in documents
    ]
    return mapped_docs


# ------------------ DELETE DOCUMENT ------------------
@app.delete("/delete-docs/{file_id}")
def delete_document(file_id: str):
    chroma_delete_success = delete_doc_from_chroma(file_id)

    if chroma_delete_success:
        db_delete_success = delete_document_record(file_id)
        if db_delete_success:
            logging.info(f"Deleted document ID {file_id} from both Chroma and DB.")
            return {"message": f"Successfully deleted document with file_id {file_id}."}
        else:
            raise HTTPException(
                status_code=500,
                detail="Deleted from Chroma but failed to delete from database."
            )
    else:
        raise HTTPException(
            status_code=500,
            detail="Failed to delete document from Chroma."
        )
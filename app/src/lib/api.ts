export interface ChatRequest {
  question: string;
  session_id?: string;
  model: 'gemini-2.5-flash-lite' | 'gemini-2.5-flash';
}

export interface ChatResponse {
  answer: string;
  session_id: string;
  model: string;
}

export interface DocumentInfo {
  file_id: string;
  filename: string;
}

export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000'; // no trailing slash

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorMessage = `API error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use the status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }
    return await response.json();
  }

  // ---------------- CHAT ----------------
  async chat(request: ChatRequest): Promise<ChatResponse> {
    const response = await fetch(`${this.baseUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    return this.handleResponse<ChatResponse>(response);
  }

  // ---------------- UPLOAD DOCUMENT ----------------
  async uploadDocument(file: File): Promise<{ message: string; file_id: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseUrl}/upload-docs`, {
      method: 'POST',
      body: formData,
    });

    return this.handleResponse<{ message: string; file_id: string }>(response);
  }

  // ---------------- LIST DOCUMENTS ----------------
  async listDocuments(): Promise<DocumentInfo[]> {
    const response = await fetch(`${this.baseUrl}/list-docs`);
    return this.handleResponse<DocumentInfo[]>(response);
  }

  // ---------------- DELETE DOCUMENT ----------------
  async deleteDocument(fileId: string): Promise<{ message: string }> {
    if (!fileId) throw new Error("fileId is required to delete a document");

    const response = await fetch(`${this.baseUrl}/delete-docs/${fileId}`, {
      method: 'DELETE',
    });

    return this.handleResponse<{ message: string }>(response);
  }

}

// Export a singleton instance
export const apiService = new ApiService();

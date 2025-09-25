# 📖 RAG Document Assistant - User Guide

Welcome to the RAG Document Assistant! This guide will help you get started with uploading documents and chatting with them using AI.

## 🚀 Getting Started

### 1. Access the Application

Open your web browser and navigate to:
- **Local deployment:** http://localhost:8000
- **Remote deployment:** http://your-server-ip:8000

### 2. Set Up Your Google API Key

To use the full AI functionality, you'll need a Google API key:

#### Step 1: Get a Google API Key
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click "Get API Key"
4. Create a new API key
5. Copy the API key

#### Step 2: Configure the API Key
1. In the RAG application, go to **Settings** (gear icon in sidebar)
2. Look for the **API Key Configuration** section
3. Enter your Google API key
4. Click **Save Settings**

> **Note:** Without an API key, the application will work in "test mode" with limited functionality.

## 📁 Document Management

### Supported File Types
- **PDF** (.pdf) - Research papers, reports, books
- **Word Documents** (.docx) - Articles, essays, documents
- **HTML** (.html) - Web pages, online articles

### Uploading Documents

1. **Navigate to Documents** page (folder icon in sidebar)
2. **Drag and drop** files into the upload area, or
3. **Click "Choose Files"** to browse and select files
4. **Wait for processing** - documents are automatically indexed
5. **See your documents** in the list below

### Managing Documents

- **View all documents** in the Documents page
- **Delete documents** by clicking the trash icon
- **Search documents** using the search bar
- **See upload dates** for each document

## 💬 Chatting with Documents

### Starting a Conversation

1. **Go to the Chat page** (chat icon in sidebar)
2. **Type your question** in the input field
3. **Press Enter** or click Send
4. **Get AI responses** based on your uploaded documents

### Example Questions

Try these types of questions:
- "Summarize the main points of the document"
- "What is this document about?"
- "Find information about [specific topic]"
- "Explain the key concepts in simple terms"
- "What are the conclusions of this research?"

### Chat Features

- **Session persistence** - Your conversation continues across page refreshes
- **Context awareness** - AI remembers previous questions in the session
- **Document-specific answers** - Responses are based on your uploaded documents
- **Clickable suggestions** - Use the quick-start suggestions on the welcome screen

## ⚙️ Settings and Customization

### AI Model Settings
- **Default Model** - Choose between Gemini models
- **Response Temperature** - Control creativity vs. accuracy
- **Max Response Length** - Set response length limits
- **Stream Responses** - Enable real-time response streaming

### Document Processing
- **Chunk Size** - How documents are split for processing
- **Chunk Overlap** - Overlap between document chunks
- **Max Documents Retrieved** - Number of documents to search
- **Auto-index Documents** - Automatically process uploaded files

### Interface Settings
- **Animations** - Enable/disable smooth transitions
- **Sound Effects** - Audio notifications
- **Compact Mode** - Smaller UI elements

### Data Management
- **Clear Chat History** - Reset your conversation
- **Delete All Documents** - Remove all uploaded files
- **Reset All Settings** - Restore default settings

## 🔧 Troubleshooting

### Common Issues

#### "API error" messages
- **Check your API key** in Settings
- **Verify internet connection**
- **Try refreshing the page**

#### Documents not uploading
- **Check file format** - Only PDF, DOCX, HTML are supported
- **Check file size** - Large files may take longer to process
- **Try a different file** to test

#### AI responses seem generic
- **Upload relevant documents** first
- **Ask specific questions** about your documents
- **Check if documents were processed** successfully

#### Slow responses
- **Large documents** take longer to process
- **Complex questions** may need more time
- **Check your internet connection**

### Getting Help

1. **Check the Settings page** for configuration issues
2. **Try uploading a simple document** to test functionality
3. **Clear your browser cache** if experiencing issues
4. **Contact your system administrator** for deployment issues

## 💡 Tips for Best Results

### Document Preparation
- **Use clear, well-formatted documents**
- **Avoid scanned images** (use text-based PDFs)
- **Upload documents in order** of importance
- **Keep file sizes reasonable** (under 10MB)

### Asking Questions
- **Be specific** in your questions
- **Reference document content** when possible
- **Ask follow-up questions** to dive deeper
- **Use natural language** - no special syntax needed

### Managing Your Data
- **Regularly review** your uploaded documents
- **Delete old documents** you no longer need
- **Backup important documents** separately
- **Monitor your API usage** in Google Cloud Console

## 🔒 Privacy and Security

### Your Data
- **Documents are stored locally** on the server
- **Chat history is saved** in your browser
- **API keys are stored securely** in your settings
- **No data is shared** with other users

### Best Practices
- **Use strong, unique API keys**
- **Don't share your API key** with others
- **Regularly rotate your API key**
- **Be mindful of sensitive documents**

## 🎯 Use Cases

### Research and Analysis
- **Academic papers** - Summarize research findings
- **Technical documentation** - Find specific information
- **Reports** - Extract key insights and data

### Content Creation
- **Article writing** - Use documents as reference material
- **Study guides** - Create summaries from textbooks
- **Documentation** - Generate help content from manuals

### Business Applications
- **Contract analysis** - Find specific clauses and terms
- **Policy review** - Understand company policies
- **Training materials** - Create learning content

## 🚀 Advanced Features

### Batch Processing
- **Upload multiple documents** at once
- **Process large document collections**
- **Cross-reference information** across documents

### Custom Settings
- **Adjust AI parameters** for your use case
- **Optimize for speed vs. accuracy**
- **Customize the interface** to your preferences

---

## 🎉 You're Ready!

You now have everything you need to:
- ✅ Upload and manage documents
- ✅ Chat with your documents using AI
- ✅ Customize the application to your needs
- ✅ Troubleshoot common issues

Start by uploading a document and asking your first question. The AI will help you explore and understand your content in new ways!

**Happy document exploring! 📚🤖**

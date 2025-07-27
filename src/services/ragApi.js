const API_BASE_URL = process.env.REACT_APP_RAG_API_URL || 'http://localhost:8000';

class RagApiService {
  async chat(question) {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Chat API error:', error);
      throw error;
    }
  }

  async getDocuments() {
    try {
      const response = await fetch(`${API_BASE_URL}/documents`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Documents API error:', error);
      throw error;
    }
  }

  async getSampleQuestions() {
    try {
      const response = await fetch(`${API_BASE_URL}/sample-questions`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Sample questions API error:', error);
      throw error;
    }
  }
}

const ragApiService = new RagApiService();
export default ragApiService;

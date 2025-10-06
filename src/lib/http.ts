// Centralized HTTP client with error handling, retries, and logging

export interface HttpError {
  status: number;
  message: string;
  data?: any;
}

export interface HttpOptions extends RequestInit {
  retries?: number;
  retryDelay?: number;
}

class HttpClient {
  private baseURL: string;

  constructor(baseURL: string = '') {
    this.baseURL = baseURL;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: HttpError = {
        status: response.status,
        message: response.statusText,
      };

      try {
        error.data = await response.json();
      } catch {
        // Response body might not be JSON
      }

      // Log error to monitoring service (TODO: integrate with Sentry/LogRocket)
      this.logError(error);

      throw error;
    }

    return response.json();
  }

  private logError(error: HttpError) {
    // TODO: Send to error monitoring service (Sentry, LogRocket, etc.)
    console.error('[HTTP Error]', {
      status: error.status,
      message: error.message,
      data: error.data,
      timestamp: new Date().toISOString(),
    });
  }

  private async retryFetch<T>(
    url: string,
    options: HttpOptions,
    attempt: number = 1
  ): Promise<T> {
    const maxRetries = options.retries || 3;
    const retryDelay = options.retryDelay || 1000;

    try {
      const response = await fetch(url, options);
      return this.handleResponse<T>(response);
    } catch (error) {
      if (attempt < maxRetries) {
        console.log(`Retry attempt ${attempt} for ${url}`);
        await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
        return this.retryFetch<T>(url, options, attempt + 1);
      }
      throw error;
    }
  }

  async get<T>(endpoint: string, options?: HttpOptions): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    return this.retryFetch<T>(url, {
      ...options,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
  }

  async post<T>(endpoint: string, data?: any, options?: HttpOptions): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    return this.retryFetch<T>(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data?: any, options?: HttpOptions): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    return this.retryFetch<T>(url, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string, options?: HttpOptions): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    return this.retryFetch<T>(url, {
      ...options,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
  }
}

// Create default instance
// TODO: Replace with actual API base URL from environment variables
export const http = new HttpClient(import.meta.env.VITE_API_BASE || '');

export default http;

const API_URL = '';  // Use relative URLs for Next.js API routes

export class AdminAPI {
  private static getAuthHeaders() {
    const token = localStorage.getItem('auth-token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  // Products
  static async getProducts(params?: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.limit) queryParams.set('limit', params.limit.toString());
    if (params?.search) queryParams.set('search', params.search);
    if (params?.categoryId) queryParams.set('categoryId', params.categoryId);

    const response = await fetch(
      `${API_URL}/api/admin/products?${queryParams}`,
      {
        headers: this.getAuthHeaders(),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch products');
    }

    return response.json();
  }

  static async createProduct(productData: any) {
    const response = await fetch(`${API_URL}/api/admin/products`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create product');
    }

    return response.json();
  }

  static async updateProduct(id: string, productData: any) {
    const response = await fetch(`${API_URL}/api/admin/products/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update product');
    }

    return response.json();
  }

  static async deleteProduct(id: string) {
    const response = await fetch(`${API_URL}/api/admin/products/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete product');
    }

    return response.json();
  }

  static async updateStock(id: string, stock: number, variantId?: string) {
    const response = await fetch(`${API_URL}/api/admin/products/${id}/stock`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ stock, variantId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update stock');
    }

    return response.json();
  }

  static async getLowStockProducts(threshold: number = 10) {
    const response = await fetch(
      `${API_URL}/api/admin/products/low-stock?threshold=${threshold}`,
      {
        headers: this.getAuthHeaders(),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch low stock products');
    }

    return response.json();
  }

  static async bulkUpdate(products: Array<{ id: string; data: any }>) {
    const response = await fetch(`${API_URL}/api/admin/products/bulk-update`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ products }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to bulk update products');
    }

    return response.json();
  }

  // Categories
  static async getCategories() {
    const response = await fetch(`${API_URL}/api/categories`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch categories');
    }

    return response.json();
  }
}

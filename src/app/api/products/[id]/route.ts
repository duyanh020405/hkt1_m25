import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
const apiUrl = 'http://localhost:3000/api/products';
const fetchProducts =  () => {
  try {
    const response:any = axios.get('http://localhost:3000/api/products');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const products = await fetchProducts();
    
    const product = products.find((product: any) => product.id === id);
    if (product) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
  } catch (error) {
    console.error('Error handling GET request:', error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const products = await fetchProducts();

    const productIndex = products.findIndex((product: any) => product.id === id);

    if (productIndex !== -1) {
      const updatedProducts = products.filter((product: any) => product.id !== id);
      
      // Assuming you need to send the updated product list back to the server
      // This part is hypothetical. Replace it with the actual method you use to update your data source.
      await axios.post(apiUrl, { data: updatedProducts });

      return NextResponse.json({ message: 'Product deleted successfully' });
    } else {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error handling DELETE request:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

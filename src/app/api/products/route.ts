import { NextResponse } from "next/server"

const products:any[] =[

]
export async function GET() {
  return NextResponse.json({
    data:products
  })
}
export async function POST(newPro:any) {
    try {
      const newProduct = await newPro.json();
      newProduct.id = 
      products.push(newProduct);
      return NextResponse.json({
        message: 'Thanh cong!',
        data: newProduct,
      }, { status: 201 });
    } catch (error) {
      return NextResponse.json({
        message: 'sai',
      }, { status: 400 });
    }
  }

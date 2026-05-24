import { useState } from 'react';

interface ProductFormState {
  productName: string;
  price: string;
  stockQuantity: string;
  brandName: string;
  discount: string;
  imageFiles: File[];
  imagePreviews: string[];
  description: string;
  isActive: boolean;
}

const initialState: ProductFormState = {
  productName: '',
  imageFiles: [],
  imagePreviews: [],
  price: '',
  stockQuantity: '',
  brandName: '',
  discount: '',
  description: '',
  isActive: true,
};

export const useProductForm = () => {
  const [formData, setFormData] = useState<ProductFormState>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    const previews = files.map(file => URL.createObjectURL(file));
    
    setFormData(prev => ({
      ...prev,
      imageFiles: [...prev.imageFiles, ...files],
      imagePreviews: [...prev.imagePreviews, ...previews]
    }));
    
    console.log('📸 Files selected:', files);
  };
  
  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      imageFiles: prev.imageFiles.filter((_, i) => i !== index),
      imagePreviews: prev.imagePreviews.filter((_, i) => i !== index)
    }));
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isActive: checked }));
    console.log('🔄 Switch changed to:', checked ? 'ACTIVE' : 'INACTIVE');
  };

  const reset = () => {
    setFormData(initialState);
    console.log('🔄 Form reset');
  };

  return { 
    formData, 
    handleChange, 
    handleImageUpload,
    removeImage, 
    handleSwitchChange, 
    reset 
  };
};
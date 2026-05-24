'use client'

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import CustomButton from '@/components/reusable/CustomButton';
import { useProductMutations } from '@/hooks/marketplace/useProductMutation'; // Make sure this path is correct
import ModalWrapper from '../../modal/ModalWrapper';
import ModalHeader from '../../modal/ModalHeader';
import ModalBody from '../../modal/ModalBody';
import ModalFooter from '../../modal/ModalFooter';
import { useProductForm } from '@/hooks/marketplace/useProductForm';
import { X } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export const AddProductModal = ({ isOpen, onClose, onSuccess }: Props) => {
    const { formData, handleChange, handleImageUpload, removeImage, handleSwitchChange, reset } = useProductForm();
    const { createProductWithImages, loading } = useProductMutations();

    const handleSubmit = async () => {
        // Validate required fields
        if (!formData.productName || !formData.price || !formData.stockQuantity || !formData.brandName) {
            toast.error('Please fill in all required fields');
            return;
        }

        // Create FormData for multipart/form-data submission
        const formDataToSend = new FormData();

        // Append all fields
        formDataToSend.append('productName', formData.productName);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('stockQuantity', formData.stockQuantity);
        formDataToSend.append('brandName', formData.brandName);
        formDataToSend.append('discount', formData.discount || '0');
        formDataToSend.append('description', formData.description);
        formDataToSend.append('isActive', String(formData.isActive));

        // IMPORTANT: Set status based on isActive
        const status = formData.isActive ? 'ACTIVE' : 'INACTIVE';
        formDataToSend.append('status', status);

        // Append image files
        formData.imageFiles.forEach((file) => {
            formDataToSend.append('images', file);
        });

        console.log('📤 Sending FormData with files:', formData.imageFiles);
        console.log('📊 Status set to:', status);

        const { success } = await createProductWithImages(formDataToSend);

        if (success) {
            toast.success('Product created successfully!');
            reset();
            onSuccess?.();
            onClose();
        }
    };

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose}>
            <ModalHeader title="Add New Product" className="text-whiteColor" />
            <ModalBody className="flex flex-col gap-4">
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label className="text-gray-400">Product Name *</label>
                        <Input
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            className='border mt-2 h-16 text-whiteColor'
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-400">Price *</label>
                        <Input
                            name="price"
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            className='border mt-2 h-16 text-whiteColor'
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-400">Stock Quantity *</label>
                        <Input
                            name="stockQuantity"
                            type="number"
                            value={formData.stockQuantity}
                            onChange={handleChange}
                            placeholder="Enter stock quantity"
                            className='border mt-2 h-16 text-whiteColor'
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-400">Brand Seller *</label>
                        <Input
                            name="brandName"
                            value={formData.brandName}
                            onChange={handleChange}
                            placeholder="Enter brand seller"
                            className='border mt-2 h-16 text-whiteColor'
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-400">Discount (%)</label>
                        <Input
                            name="discount"
                            type="number"
                            value={formData.discount}
                            onChange={handleChange}
                            placeholder="Enter discount"
                            className='border mt-2 h-16 text-whiteColor'
                        />
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="text-gray-400">Product Images</label>
                    <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className='border mt-2 h-12 text-whiteColor file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#C0C0C0]/10 file:text-black-600 hover:file:bg-[#C0C0C0]/30 file:h-full file:flex file:items-center file:my-0 file:leading-normal' />
                    <p className="text-xs text-gray-500 mt-1">
                        You can select multiple images
                    </p>
                </div>

                {/* Image Previews */}
                {formData.imagePreviews.length > 0 && (
                    <div className="mt-2">
                        <label className="text-gray-400">Selected Images:</label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {formData.imagePreviews.map((preview, index) => (
                                <div key={index} className="relative group">
                                    <div className="relative w-full h-24 border border-gray-700 rounded overflow-hidden">
                                        <img
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = '/placeholder.png';
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={14} className="text-white" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    <label className="text-gray-400">Description *</label>
                    <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                        className='border mt-2 text-whiteColor'
                        rows={9}
                        required
                    />
                </div>

                <div className='flex items-center gap-2'>
                    <Switch checked={formData.isActive} onCheckedChange={handleSwitchChange} />
                    <div className='text-white'>Active (visible to customer)</div>
                </div>
            </ModalBody>
            <ModalFooter>
                <CustomButton
                    label={loading ? "Adding..." : "Add Product"}
                    className='w-full bg-blueColor text-whiteColor hover:bg-blueColor/80'
                    onClick={handleSubmit}
                />
            </ModalFooter>
        </ModalWrapper>
    );
};